"use client";
import dynamic from "next/dynamic";

const Backing = dynamic(() => import("./backing"), { ssr: false });

export default function BackingClient() {
  return <Backing layers={3} points={25} speed={0.00006} pulseSpeed={0.00025} />;
}