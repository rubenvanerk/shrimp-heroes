
import React from 'react';

export const ShrimpMascot: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {`
          .shrimp-body {
            animation: shrimp-bob 3s ease-in-out infinite;
            transform-origin: 50% 90%;
          }
          @keyframes shrimp-bob {
            0%, 100% { transform: translateY(0) rotate(-2deg); }
            50% { transform: translateY(-8px) rotate(2deg); }
          }
          .shrimp-eye {
            animation: shrimp-blink 4s infinite;
          }
          @keyframes shrimp-blink {
            0%, 90%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.1); }
          }
        `}
      </style>
      <g className="shrimp-body">
        <path
          fill="#FFC2B4"
          d="M158.5,82.3c0,35-21.4,56.7-52.2,69.6c-4.4,1.8-9,2.8-13.8,2.8c-10.8,0-20.9-4.2-28.5-11.8 c-10-10-13.9-24.1-10.8-37.5c2.9-12.3,12.2-22.3,24.1-26.6c14.7-5.3,30.3-0.8,40.6,9.5C140.2,100,158.5,96.3,158.5,82.3z"
        />
        <path
          fill="#FF9A8A"
          d="M140.2,120.3c0,23.3-14.2,37.8-34.8,46.4c-2.9,1.2-6,1.9-9.2,1.9c-7.2,0-13.9-2.8-19-7.9 c-6.6-6.6-9.2-16-7.2-25c2-8.2,8.1-14.8,16-17.7c9.8-3.5,20.2-0.5,27,6.3C126.3,132.8,140.2,129.8,140.2,120.3z"
        />
        <path
          fill="#FFE0DA"
          d="M125.1,100.9c-10.2,10.2-25.9,14.8-40.6,9.5C72.7,106,63.4,116,60.5,128.3c-3.1,13.4,0.8,27.5,10.8,37.5 c2.1,2.1,4.5,3.9,7.1,5.3c-13.2-9.4-21.5-23.8-21.5-39.8c0-20.6,12.5-38.3,30.4-45.7C102.1,80.5,116.3,86,125.1,100.9z"
        />
        {/* Eyes */}
        <circle className="shrimp-eye" fill="#333" cx="120" cy="85" r="7" />
        <circle className="shrimp-eye" fill="#333" cx="138" cy="88" r="7" />
        <circle fill="#FFF" cx="122" cy="83" r="2" />
        <circle fill="#FFF" cx="140" cy="86" r="2" />
      </g>
    </svg>
  );
};
