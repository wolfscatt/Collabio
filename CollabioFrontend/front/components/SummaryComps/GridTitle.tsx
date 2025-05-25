import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

interface GridTitleProps {
  title: string;
  text: string;
  isShowAll?: boolean;
}

const GridTitle: React.FC<GridTitleProps> = ({ text, title, isShowAll }) => {
  return (
    <div className="p-[3vh] border-b border-[#f0f0f0]">
      <h3 className="text-[var(--color-dark)] text-[2.5vh] flex justify-between font-semibold">
        {title}
        {isShowAll ? (
          <a
            href="zamancizelgesi.html"
            className="text-[var(--color-primary)] flex flex-row items-center text-[2vh] border border-[var(--color-primary)] px-2 py-1 rounded hover:bg-[var(--color-primary)] hover:text-white transition"
          >
            <FaExternalLinkAlt className="mr-[0.8vh] text-[1.5vh]" /> Tümünü Göster
          </a>
        ) : (
          <></>
        )}
      </h3>
      <p className="text-sm text-[var(--color-light)]">{text}</p>
    </div>
  );
};

export default GridTitle;
