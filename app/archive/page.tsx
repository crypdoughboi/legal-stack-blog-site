import { permanentRedirect } from "next/navigation";

/** The writing index absorbed the archive; keep old links working. */
export default function ArchivePage() {
  permanentRedirect("/writing");
}
