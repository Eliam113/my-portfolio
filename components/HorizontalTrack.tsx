// components/HorizontalTrack.js

"use client";

import React, { useRef, useEffect, ReactNode, WheelEvent } from 'react';

// Define the shape of the component's props
interface HorizontalTrackProps {
    children: ReactNode; // 'ReactNode' is the correct type for children prop
}

// Use the defined interface for the component
export default function HorizontalTrack({ children }: HorizontalTrackProps) {
    // Specify the ref type: a mutable ref object for an HTMLDivElement
    const trackRef = useRef<HTMLDivElement>(null);

    // --- Core Logic: Translate Vertical Wheel to Horizontal Scroll ---
    // Specify the event type as React.WheelEvent<HTMLDivElement>
    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        if (trackRef.current) {
            // Prevent the parent (main) container from scrolling vertically
            e.preventDefault(); 
            
            // Apply the vertical scroll delta (e.deltaY) to the horizontal position (scrollLeft)
            // Note: deltaY is a number, so this operation is safe.
            trackRef.current.scrollLeft += e.deltaY;
        }
    };
    // ----------------------------------------------------------------

    // We'll use the native `wheel` event handler attached via `useEffect` 
    // to ensure `e.preventDefault()` works reliably across all browsers.
    useEffect(() => {
        const trackElement = trackRef.current;
        if (trackElement) {
            // NOTE: We attach the native DOM event listener here, so we cast the function.
            // The browser's native WheelEvent type is what is actually handled here.
            trackElement.addEventListener('wheel', handleWheel as unknown as EventListener, { passive: false });
        }

        return () => {
            if (trackElement) {
                trackElement.removeEventListener('wheel', handleWheel as unknown as EventListener);
            }
        };
    }, []); // Run once on mount

    return (
        <div 
            ref={trackRef}
            // This is the container that scrolls horizontally
            className="flex w-[200vw] h-full overflow-x-scroll snap-x snap-mandatory no-scrollbar"
        >
            {children}
        </div>
    );
}