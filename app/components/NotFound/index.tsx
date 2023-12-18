import { Montserrat } from "@next/font/google";
import React from "react";
import styles from "@/styles/components/NotFound.module.scss";

interface NotFoundProps {
  message?: string;
}

const montserrat = Montserrat({ weight: "400", subsets: ["latin"] });

export default function NotFound({ message = "Not found" }: NotFoundProps) {
  return (
    <div className={styles.notFound}>
      <span className={montserrat.className}>{message}</span>
    </div>
  );
}
