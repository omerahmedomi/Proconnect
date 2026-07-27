"use client";

import { useEffect } from "react";
import { markAllAsRead } from "@/app/actions/notification";
import { useRouter } from "next/navigation";

export default function MarkAsReadClient() {
  const router = useRouter();

  useEffect(() => {
    async function run() {
      await markAllAsRead();
      router.refresh();
    }

    run();
  }, []);

  return null;
}
