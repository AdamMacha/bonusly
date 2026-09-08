"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

export interface HeroArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string | null;
  featured?: boolean;
  publishedAt?: Date | null;
  category: {
    name: string;
    slug: string;
    icon?: string | null;
  };
  author?: {
    name: string;
    avatar?: string | null;
  } | null;
  offer?: {
    name: string;
    bonus: string | null;
    slug: string;
  } | null;
}

interface HeroCarouselProps {
  articles: HeroArticle[];
}

export function HeroCarousel({ articles }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = articles.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-rotate every 4.5s unless paused
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, total, nextSlide]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (total === 0) return null;

  return (
    <div
      className="relative w-full max-w-[480px] lg:max-w-none mx-auto select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Scene Perspective Container */}
      <div
        className="relative h-[430px] sm:h-[460px] w-full flex items-center justify-center overflow-visible"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 48%",
        }}
      >
        {/* Ambient radial glow under active card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full bg-green/15 blur-[90px] pointer-events-none transition-all duration-700 -z-10" />

        {/* Carousel Cards */}
        <div
          className="relative w-[285px] sm:w-[330px] md:w-[350px] h-[400px] sm:h-[430px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {articles.map((article, index) => {
            let diff = index - activeIndex;
            // wrap around relative difference
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const isActive = diff === 0;
            const isClickableSide = Math.abs(diff) === 1;

            // 3D positioning
            let transform = "";
            let opacity = 0;
            let zIndex = 0;
            let filter = "";

            if (diff === 0) {
              transform = "translateX(0%) translateZ(0px) rotateY(0deg) scale(1)";
              opacity = 1;
              zIndex = 30;
              filter = "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.6))";
            } else if (diff === 1) {
              transform = "translateX(45%) translateZ(-130px) rotateY(-26deg) scale(0.86)";
              opacity = 0.65;
              zIndex = 20;
              filter = "brightness(0.72) blur(0.4px)";
            } else if (diff === -1) {
              transform = "translateX(-45%) translateZ(-130px) rotateY(26deg) scale(0.86)";
              opacity = 0.65;
              zIndex = 20;
              filter = "brightness(0.72) blur(0.4px)";
            } else if (diff === 2) {
              transform = "translateX(75%) translateZ(-240px) rotateY(-40deg) scale(0.72)";
              opacity = 0.2;
              zIndex = 10;
              filter = "brightness(0.5) blur(1px)";
            } else if (diff === -2) {
              transform = "translateX(-75%) translateZ(-240px) rotateY(40deg) scale(0.72)";
              opacity = 0.2;
              zIndex = 10;
              filter = "brightness(0.5) blur(1px)";
            } else {
              transform = `translateX(${diff > 0 ? 90 : -90}%) translateZ(-300px) rotateY(${
                diff > 0 ? -45 : 45
              }deg) scale(0.6)`;
              opacity = 0;
              zIndex = 5;
            }

            return (
              <div
                key={article.id}
                onClick={(e) => {
                  if (isClickableSide) {
                    e.preventDefault();
                    setActiveIndex(index);
                  }
                }}
                className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isActive ? "cursor-pointer" : isClickableSide ? "cursor-pointer" : "pointer-events-none"
                }`}
                style={{
                  transform,
                  opacity,
                  zIndex,
                  filter,
                  transformStyle: "preserve-3d",
                }}
              >
                <Link
                  href={isActive ? `/blog/${article.slug}` : "#"}
                  tabIndex={isActive ? 0 : -1}
                  className={`group relative w-full h-full flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 ${
                    isActive
                      ? "border-white/20 bg-navy-light/95 backdrop-blur-xl shadow-2xl ring-1 ring-green/20 hover:border-green/50"
                      : "border-white/10 bg-navy-light/80 backdrop-blur-md"
                  }`}
                >
                  {/* Top Image Section */}
                  <div className="relative h-[190px] sm:h-[210px] w-full overflow-hidden bg-navy-dark">
                    {article.featuredImage ? (
                      <Image
                        src={article.featuredImage}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 300px, 350px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        priority={isActive}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-navy via-navy-light to-navy flex items-center justify-center">
                        <span className="text-4xl text-green/30 font-bold">BONUSLY</span>
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-light via-navy-light/30 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-navy/85 backdrop-blur-md text-green border border-green/30 shadow-sm">
                        {article.category.name}
                      </span>

                      {article.featured && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-400 text-navy shadow-sm uppercase tracking-wide">
                          <svg className="w-3 h-3 fill-navy" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          Top tip
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Content Section */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-green transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>

                    {/* Bottom Feature: Offer bonus pill or read CTA */}
                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                      {article.offer ? (
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="flex-shrink-0 w-2 h-2 rounded-full bg-green animate-pulse" />
                          <span className="text-xs font-semibold text-green truncate">
                            {article.offer.bonus || article.offer.name}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">Průvodce</span>
                      )}

                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:text-green transition-all flex-shrink-0">
                        Číst článek
                        <svg
                          className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls: Nav buttons and indicators */}
      <div className="mt-3 sm:mt-4 flex items-center justify-between px-2 max-w-[340px] sm:max-w-[380px] mx-auto">
        {/* Prev button */}
        <button
          onClick={prevSlide}
          aria-label="Předchozí článek"
          className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 hover:border-white/20 transition-all hover:scale-105 active:scale-95 shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Dots indicators */}
        <div className="flex items-center gap-1.5">
          {articles.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Přejít na článek ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                i === activeIndex
                  ? "w-6 h-2 bg-green shadow-sm shadow-green/50"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={nextSlide}
          aria-label="Následující článek"
          className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 hover:border-white/20 transition-all hover:scale-105 active:scale-95 shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Auto-rotate status / pause hint */}
      <div className="mt-2 text-center">
        <span className="text-[11px] text-slate-500 font-medium tracking-wide">
          {isPaused ? "⏸ Pozastaveno pro čtení" : "⟳ Automatické otáčení · Kliknutím otevřete"}
        </span>
      </div>
    </div>
  );
}
