import { Inter } from "next/font/google";
import React from "react";

import { CardEmpty, CardGeneration, SectionVoice } from "../../components/CardBig";
import { getNpzData, getOggData } from "../../data/getVoicesData";
import { GenerationRaw } from "../../types/Generation";
import { Template } from "../../components/Template";

export const inter = Inter({ subsets: ["latin"] });

export default function Home({
  generations,
  npzData,
}: {
  generations: GenerationRaw[];
  npzData: any[];
}) {
  return (
    <Template title="Voice Drafts">
      {/* <div className="grid gap-4 grid-cols-1 w-full"> */}
      <div className="flex flex-col gap-4 w-full">
        {/* {npzData.map((npz) => (
          <CardVoiceNpz key={npz.date} generation={npz} />
        ))} */}
        {npzData
          .map((npz) => ({
            npz,
            generations: generations.filter(
              ({ history_hash }) => history_hash === npz.hash
            ),
          }))
          .map(({ npz, generations }) => (
            <SectionVoice key={npz.date} generation={npz}>
              {generations.map((generation) => (
                <CardGeneration
                  key={generations[0].history_hash}
                  metadata={generation}
                />
              ))}
            </SectionVoice>
          ))}
      </div>{" "}
      <CardEmpty
          title="Add a new voice draft"
          link="https://github.com/rsxdalv/bark-speaker-directory/pull/7"
        />
    </Template>
  );
}

export const getStaticProps = async () => {
  // const generations: GenerationRaw[] = await getOggData();
  const generations: GenerationRaw[] = [];
  // const npzData = await getNpzData();
  const npzData = [];
  return {
    props: {
      generations: generations,
      npzData: npzData,
    },
  };
};
