
import React from 'react';
import { SplitText } from './SplitText';

export const Intro: React.FC = () => {
  return (
    <section className="py-32 px-6 md:px-20 grid md:grid-cols-2 gap-16 max-w-[1800px] mx-auto bg-stone-bg text-dark">
      <div>
        <h2 className="font-display text-4xl md:text-5xl leading-relaxed">
          <SplitText tag="div">JAKOŚĆ, KTÓRA ROŚNIE LATAMI.</SplitText>
          <span className="text-moss block">
          
          </span>
        </h2>
      </div>
      
      <div className="text-xl font-body font-light leading-relaxed text-gray-700">
        <div className="mb-8">
            <SplitText tag="p">
            Wierzymy, że idealna choinka to efekt cierpliwości i szacunku do natury. Nasza plantacja to hektary pasji, gdzie każde drzewko otrzymuje indywidualną opiekę.
            </SplitText>
        </div>
        
        <div className="h-px w-full bg-black/10 my-12" />
        
        <div className="flex justify-between text-sm font-body uppercase tracking-[0.2em]">
          <div className="text-center"> 
            <span className="block opacity-50 mb-1">Lokalizacja</span>
            <span className="font-bold block">SOŁDANY 28</span>
            <span className="font-bold block">Warmińsko-Mazurskie</span>
        </div>
        <div className="text-center">
          <span className="block opacity-50 mb-1">Założona</span>
          <span className="font-bold">2010</span>
        </div>
        </div>
      </div>
    </section>
  );
};
