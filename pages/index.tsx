import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import { isMobile } from "react-device-detect";
import CheckOnDesktop from "../public/check-on-desktop.svg";
import Header from "../components/Header";
import { NFTList } from "../components/NFTList";  // Ensure NFTList is still correct
import { ElementsContainer } from "../components/ElementsContainer";

export default function Home() {
  const [collection, setCollection] = useState<string | undefined>();
  const [isElementsModalOpen, setIsElementsModalOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof router.query.collectionAddress === "string") {
      setCollection(router.query.collectionAddress);
    }
  }, [router.query]);

  return (
    <>
      {isMobile ? (
        <div className="h-[100vh] w-[100vw] justify-center items-center p-10">
          <Image src={CheckOnDesktop} alt="get stars" className="m-auto" />
        </div>
      ) : (
        <div>
          <Header setShowModal={setIsElementsModalOpen} />
          <div className="px-10 sm:px-14 justify-center align-middle items-center self-center origin-center">
            <NFTList setIsElementsModalOpen={setIsElementsModalOpen} collection={collection} />
            <Toaster position="bottom-right" />
          </div>
          <ElementsContainer
            isOpen={isElementsModalOpen}
            setIsOpen={setIsElementsModalOpen}
          />
        </div>
      )}
    </>
  );
}
