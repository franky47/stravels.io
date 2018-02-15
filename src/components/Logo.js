import React from 'react'

export default ({ color = 'limegreen', size = 64 }) => (
  <svg version='1.0' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
    x='0px' y='0px'
    width={`${size}px`} height={`${size}px`}
    viewBox='0 0 64 64'
    enable-background='new 0 0 64 64'
    xmlSpace='preserve'
  >
    <g>
      <circle id='Start' fill='none' stroke={color} stroke-width='4' stroke-linecap='round' stroke-miterlimit='10' cx='10.58' cy='53.047' r='4.526' />
      <g id='Finish'>
        <line fill='none' stroke={color} stroke-width='4' stroke-linecap='round' stroke-miterlimit='10' x1='49.801' y1='6.377' x2='57.912' y2='14.489' />
        <line fill='none' stroke={color} stroke-width='4' stroke-linecap='round' stroke-miterlimit='10' x1='57.912' y1='6.377' x2='49.801' y2='14.489' />
      </g>
      <g>
        <defs>
          <rect id='SVGID_1_' x='16.892' y='7.521' width='32.472' height='48.925' />
        </defs>
        <clipPath id='SVGID_2_'>
          <use xlinkHref='#SVGID_1_' overflow='visible' />
        </clipPath>
        <g clip-path='url(#SVGID_2_)'>
          <g>
            <path fill='none' stroke={color} stroke-width='4' stroke-linecap='round' stroke-miterlimit='10' d='M54.638,9.689 c0,0-1.056,0.112-2.795,0.366' />
            <path fill='none' stroke={color} stroke-width='4' stroke-linecap='round' stroke-miterlimit='10' stroke-dasharray='5.838,5.838' d='M46.091,11.04c-9.149,1.798-22.686,5.603-25.129,12.647c-3.753,10.819,24.509,7.286,21.197,20.534 c-2.336,9.347-16.38,9.571-24.45,8.894' />
            <path fill='none' stroke={color} stroke-width='4' stroke-linecap='round' stroke-miterlimit='10' d='M14.802,52.81 c-1.728-0.218-2.789-0.419-2.789-0.419' />
          </g>
        </g>
      </g>
    </g>
  </svg>
)
