"use client";

import type Lenis from "lenis";

import { useEffect, useMemo, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLenis } from "lenis/react";

const LIST_SCROLL_STORAGE_PREFIX = "posts:list-scroll:";

type NavigationMode = "pop" | "push";

type RouteSnapshot = {
  pathname: string;
  url: string;
};

function isPostsList(pathname: string) {
  return pathname === "/posts";
}

function isPostsDetail(pathname: string) {
  return pathname.startsWith("/posts/");
}

function buildRouteUrl(pathname: string, search: string) {
  return search ? `${pathname}?${search}` : pathname;
}

function getListScrollStorageKey(url: string) {
  return `${LIST_SCROLL_STORAGE_PREFIX}${url}`;
}

function readStoredListScroll(url: string) {
  const rawValue = window.sessionStorage.getItem(getListScrollStorageKey(url));

  if (rawValue === null) {
    return null;
  }

  const parsedValue = Number(rawValue);
  return Number.isFinite(parsedValue) ? parsedValue : null;
}

function writeStoredListScroll(url: string, top: number) {
  const normalizedTop = Math.max(0, Math.round(top));
  window.sessionStorage.setItem(
    getListScrollStorageKey(url),
    String(normalizedTop),
  );
}

function scrollToPosition(lenis: Lenis | undefined, top: number) {
  const normalizedTop = Math.max(0, Math.round(top));

  if (lenis) {
    lenis.scrollTo(normalizedTop, { force: true, immediate: true });
    return;
  }

  window.scrollTo({ behavior: "auto", top: normalizedTop });
}

export function PostsScrollManager() {
  const lenis = useLenis();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousRouteRef = useRef<RouteSnapshot | null>(null);
  const pendingNavigationModeRef = useRef<NavigationMode>("push");
  const pauseListTrackingRef = useRef(false);
  const search = searchParams.toString();
  const currentUrl = useMemo(
    () => buildRouteUrl(pathname, search),
    [pathname, search],
  );

  useEffect(() => {
    const handlePopState = () => {
      pendingNavigationModeRef.current = "pop";
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const previousRoute = previousRouteRef.current;
    const navigationMode = pendingNavigationModeRef.current;

    pendingNavigationModeRef.current = "push";
    previousRouteRef.current = { pathname, url: currentUrl };

    let firstFrame = 0;
    let secondFrame = 0;

    const scheduleScroll = (top: number) => {
      if (isPostsList(pathname)) {
        pauseListTrackingRef.current = true;
      }

      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          scrollToPosition(lenis, top);

          if (isPostsList(pathname)) {
            writeStoredListScroll(currentUrl, top);
            pauseListTrackingRef.current = false;
          }
        });
      });
    };

    if (!previousRoute) {
      pauseListTrackingRef.current = false;
      return () => {
        window.cancelAnimationFrame(firstFrame);
        window.cancelAnimationFrame(secondFrame);
      };
    }

    if (
      previousRoute.pathname === pathname &&
      previousRoute.url === currentUrl
    ) {
      return () => {
        window.cancelAnimationFrame(firstFrame);
        window.cancelAnimationFrame(secondFrame);
      };
    }

    if (isPostsDetail(pathname)) {
      scheduleScroll(0);
      return () => {
        window.cancelAnimationFrame(firstFrame);
        window.cancelAnimationFrame(secondFrame);
      };
    }

    if (isPostsList(pathname) && isPostsDetail(previousRoute.pathname)) {
      const restoredTop =
        navigationMode === "pop" ? (readStoredListScroll(currentUrl) ?? 0) : 0;

      scheduleScroll(restoredTop);
      return () => {
        window.cancelAnimationFrame(firstFrame);
        window.cancelAnimationFrame(secondFrame);
      };
    }

    pauseListTrackingRef.current = false;

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [currentUrl, lenis, pathname]);

  useEffect(() => {
    if (!isPostsList(pathname)) {
      return;
    }

    let frame = 0;

    const saveScrollPosition = () => {
      if (pauseListTrackingRef.current || frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        writeStoredListScroll(currentUrl, window.scrollY);
      });
    };

    saveScrollPosition();
    window.addEventListener("scroll", saveScrollPosition, { passive: true });

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", saveScrollPosition);
    };
  }, [currentUrl, pathname]);

  return null;
}
