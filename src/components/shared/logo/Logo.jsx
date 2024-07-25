import Link from "next/link";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import React from 'react';

const Logo = ({ customizer }) => {
  const LinkStyled = styled('a')(() => ({
    height: customizer?.TopbarHeight || 50, // Default height if undefined
    width: customizer?.isCollapse ? "40px" : "180px",
    overflow: "hidden",
    display: "block",
  }));

  if (!customizer) {
    return null; // Return null if customizer is not defined
  }

  if (customizer.activeDir === "ltr") {
    return (
      <Link href="/" passHref>
        <LinkStyled>
          {customizer.activeMode === "dark" ? (
            <Image
              src="/images/logos/light-logo.svg"
              alt="logo"
              height={customizer.TopbarHeight}
              width={174}
              priority
            />
          ) : (
            <Image
              src="/images/logos/dark-logo.svg"
              alt="logo"
              height={customizer.TopbarHeight}
              width={174}
              priority
            />
          )}
        </LinkStyled>
      </Link>
    );
  }

  return (
    <Link href="/" passHref>
      <LinkStyled>
        {customizer.activeMode === "dark" ? (
          <Image
            src="/images/logos/dark-rtl-logo.svg"
            alt="logo"
            height={customizer.TopbarHeight}
            width={174}
            priority
          />
        ) : (
          <Image
            src="/images/logos/light-logo-rtl.svg"
            alt="logo"
            height={customizer.TopbarHeight}
            width={174}
            priority
          />
        )}
      </LinkStyled>
    </Link>
  );
};

export default Logo;
