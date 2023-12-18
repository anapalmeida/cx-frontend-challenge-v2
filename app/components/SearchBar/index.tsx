import React, { ChangeEvent, FormEvent, useState } from "react";

import { IoSearchOutline } from "react-icons/io5";
import styles from "@/styles/components/SearchBar.module.scss";
import { useRouter } from "next/router";

export default function SearchBar() {
  const [textToSearch, setTextToSearch] = useState<string>("");
  const router = useRouter();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setTextToSearch(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search/${textToSearch}`);
  };

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <div className={styles.search__inputWrapper}>
        <input
          id="search"
          name="search"
          className={styles.search__input}
          type="text"
          placeholder="Buscar produtos, marcas e muito mais"
          onChange={handleSearch}
          value={textToSearch}
          aria-live="assertive"
        />
      </div>
      <button
        type="submit"
        className={styles.search__button}
        aria-label={`Search for ${textToSearch || "products"}`}
      >
        <i className={styles.search__buttonIcon}>
          <IoSearchOutline size="1.2rem" />
        </i>
      </button>
    </form>
  );
}
