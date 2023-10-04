"use client";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import logo from "@public/assets/images/logo.svg";

export const Navigation = () => {
  const { data: session } = useSession();

  const [provider, setProvider]: [any, Dispatch<SetStateAction<any>>] =
    useState(null);
  const [isMobMenuOpened, setOpenMobMenu]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false);

  useEffect(() => {
    const setNewProvider = async () => {
      const response = await getProviders();
      setProvider(response);
    };
    setNewProvider();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src={logo}
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image || logo}
                alt="profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((prov: any) => (
                <button
                  type="button"
                  key={prov.name}
                  onClick={() => signIn(prov.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={ session?.user.image || logo}
              alt="profile"
              width={37}
              height={37}
              onClick={() => setOpenMobMenu((prev) => !prev)}
            />
            {isMobMenuOpened && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setOpenMobMenu(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setOpenMobMenu(false)}
                >
                  Create Post
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setOpenMobMenu(false);
                    signOut();
                  }}
                  className="black_btn w-full mt-5"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((prov: any) => (
                <button
                  type="button"
                  key={prov.name}
                  onClick={() => signIn(prov.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};
