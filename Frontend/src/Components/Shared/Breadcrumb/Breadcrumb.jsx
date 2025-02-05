import Link from 'next/link';
import React from 'react';

const Breadcrumb = ({ pageTitle }) => {
    return (
        <div>
            <div className="bredcrumb_wrapper">
                <div className="container">
                    <div className="breadcrumd">
                        <Link href="/">Home </Link>
                        <div className="icon">
                            <svg
                                width="39"
                                height="38"
                                viewBox="0 0 39 38"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g filter="url(#filter0_d_1_1672)">
                                    <path
                                        d="M18.5565 25.9035C17.9726 26.4888 17.9724 27.4363 18.5561 28.0219L19.4665 28.9351C20.0524 29.5228 21.0042 29.5231 21.5904 28.9357L34.4423 16.0597C35.0268 15.4741 35.0268 14.5259 34.4423 13.9403L21.5904 1.0643C21.0042 0.476929 20.0524 0.477217 19.4665 1.06494L18.5561 1.97809C17.9724 2.56365 17.9726 3.51117 18.5565 4.09652L28.3775 13.9406C28.9616 14.5261 28.9616 15.4739 28.3775 16.0594L18.5565 25.9035Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M4.55653 25.9035C3.97256 26.4888 3.97239 27.4363 4.55614 28.0219L5.46647 28.9351C6.05238 29.5228 7.00416 29.5231 7.59042 28.9357L20.4423 16.0597C21.0268 15.4741 21.0268 14.5259 20.4423 13.9403L7.59043 1.0643C7.00416 0.476929 6.05238 0.477217 5.46647 1.06494L4.55614 1.97809C3.97239 2.56365 3.97256 3.51117 4.55653 4.09652L14.3775 13.9406C14.9616 14.5261 14.9616 15.4739 14.3775 16.0594L4.55653 25.9035Z"
                                        fill="white"
                                    />
                                </g>
                                <defs>
                                    <filter
                                        id="filter0_d_1_1672"
                                        x="0.118652"
                                        y="0.624023"
                                        width="38.7622"
                                        height="36.752"
                                        filterUnits="userSpaceOnUse"
                                        colorInterpolationFilters="sRGB"
                                    >
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix
                                            in="SourceAlpha"
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                            result="hardAlpha"
                                        />
                                        <feOffset dy="4" />
                                        <feGaussianBlur stdDeviation="2" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                        />
                                        <feBlend
                                            mode="normal"
                                            in2="BackgroundImageFix"
                                            result="effect1_dropShadow_1_1672"
                                        />
                                        <feBlend
                                            mode="normal"
                                            in="SourceGraphic"
                                            in2="effect1_dropShadow_1_1672"
                                            result="shape"
                                        />
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                        <span className="breadcrumb_last">{pageTitle}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Breadcrumb;