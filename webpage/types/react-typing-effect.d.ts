// webpage/@types/react-typing-effect.d.ts
declare module 'react-typing-effect' {
    import { FC } from 'react';
  
    interface ReactTypingEffectProps {
      text: string | string[];
      speed?: number;
      eraseSpeed?: number;
      eraseDelay?: number;
      typingDelay?: number;
      cursorRenderer?: (cursor: string) => JSX.Element;
      displayTextRenderer?: (text: string, i: number) => JSX.Element;
      className?: string;
    }
  
    const ReactTypingEffect: FC<ReactTypingEffectProps>;
    export default ReactTypingEffect;
  }