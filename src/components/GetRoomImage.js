import React from 'react';
import {Text} from 'react-native'
import Svg, { Path,G,Circle } from "react-native-svg"

const GetRoomImage = ({type}) =>{
    switch(type){
        case('living_room'):
            return(
                <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 58 58"
                    xmlSpace="preserve"
                >
                    <Path
                        style={{
                            fill: "#c5411e",
                        }}
                        d="M0 12v5h5v37h9v4h29v-4h10V17h5v-5z"
                    />
                    <Path
                        style={{
                            fill: "#b02721",
                        }}
                        d="M0 54h14v4H0zM43 54h14v4H43z"
                    />
                    <Path
                        style={{
                            fill: "#47363d",
                        }}
                        d="M47 54V27H11v27h3v4h29v-4z"
                    />
                    <Path
                        style={{
                            fill: "#b02721",
                        }}
                        d="M5 46h6v4H5zM5 38h6v4H5zM5 30h6v4H5zM47 46h6v4h-6zM47 38h6v4h-6zM47 30h6v4h-6z"
                    />
                    <Path
                        transform="rotate(45.001 21 20)"
                        style={{
                            fill: "#ed8a19",
                        }}
                        d="M18.172 17.172h5.657v5.657h-5.657z"
                    />
                    <Path
                        transform="rotate(45.001 29 20)"
                        style={{
                            fill: "#ed8a19",
                        }}
                        d="M26.172 17.172h5.657v5.657h-5.657z"
                    />
                    <Path
                        transform="rotate(45.001 37 20)"
                        style={{
                            fill: "#ed8a19",
                        }}
                        d="M34.172 17.172h5.657v5.657h-5.657z"
                    />
                    <Path
                        style={{
                            fill: "none",
                            stroke: "#b02721",
                            strokeWidth: 2,
                            strokeMiterlimit: 10,
                        }}
                        d="M5 18h6M47 18h6"
                    />
                    <Path
                        style={{
                            fill: "#ed8a19",
                        }}
                        d="m36.508 41.879-2.359-2.687c-.327 2.971-1.177 5.261-1.177 5.261 0-3.922-1.412-7.408-3.224-10.274l-.289-.329-2.303 2.624c-2.972 3.385-4.234 7.982-3.257 12.379l.026.116s-1.786-2.527-2.6-5.653a9.595 9.595 0 0 0 .92 11.418c3.796 4.325 10.509 4.356 14.346.093 3.29-3.654 3.16-9.254-.083-12.948z"
                    />
                    <Path
                        style={{
                            fill: "#61b872",
                        }}
                        d="M37.84 12h-3.281a.3.3 0 0 1-.249-.465l5.601-8.402A.3.3 0 0 1 40.16 3h3.281a.3.3 0 0 1 .249.465l-5.601 8.402a.3.3 0 0 1-.249.133z"
                    />
                    <Path
                        style={{
                            fill: "#3083c9",
                        }}
                        d="M44 0h4v12h-4z"
                    />
                    <Path
                        style={{
                            fill: "#ebba16",
                        }}
                        d="M48 2h4v10h-4z"
                    />
                    <Path
                        style={{
                            fill: "#c7cac7",
                        }}
                        d="M15 8H1c1.105 0 4 .895 4 2v2h6v-2c0-1.105 2.895-2 4-2zM32 8H18c1.105 0 4 .895 4 2v2h6v-2c0-1.105 2.895-2 4-2z"
                    />
                    <Path
                        style={{
                            fill: "none",
                            stroke: "#949493",
                            strokeWidth: 2,
                            strokeLinecap: "round",
                            strokeMiterlimit: 10,
                        }}
                        d="M1 8h14M18 8h14"
                    />
                    <Path
                        style={{
                            fill: "#efce4a",
                        }}
                        d="m32.81 50.303-1.126-1.283c-.156 1.418-.562 2.512-.562 2.512 0-1.873-.674-3.537-1.539-4.905l-.138-.157-1.1 1.253c-1.419 1.616-2.021 3.811-1.555 5.91l.013.056s-.853-1.207-1.241-2.699a4.58 4.58 0 0 0 7.288 5.495c1.57-1.745 1.509-4.418-.04-6.182z"
                    />
                </Svg>
            )
        case('garage'):
            return(<Svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 60 60"
                xmlSpace="preserve"
            >
                <Path
                    style={{
                        fill: "#e9e9e7",
                    }}
                    d="M33.809 5.28a6.295 6.295 0 0 0-7.618 0L5 21.386v5.896c.346-.08.714-.082 1.063-.033.956.136 1.917.657 2.399 1.588.265.511.338 1.151.216 1.721a2.064 2.064 0 0 0 .411 1.711c.222.269.384.61.456.965.164.82-.053 1.676-.357 2.444a6.622 6.622 0 0 1-.776 1.457c-.479.659-.479 1.566-.148 2.33.327.756.384 1.69.141 2.495-.417 1.38-1.514 2.385-2.698 2.997a4.336 4.336 0 0 1-.707.29v5.139h3.657c.181 0 .319.161.292.339L8 56.997h45.153c1.02 0 1.847-.827 1.847-1.847V21.386L33.809 5.28z"
                />
                <Path
                    style={{
                        fill: "#afb6bb",
                    }}
                    d="M13 26.997h35v30H13z"
                />
                <Path
                    style={{
                        fill: "#c7cac7",
                    }}
                    d="M13 30.997h35v2H13zM13 35.997h35v2H13zM13 40.997h35v2H13zM13 45.997h35v2H13zM13 50.997h35v2H13z"
                />
                <Path
                    style={{
                        fill: "#6c342a",
                    }}
                    d="M54.999 26.774a.993.993 0 0 1-.604-.204L31.826 9.417a3.029 3.029 0 0 0-3.652 0L5.605 26.57a1 1 0 1 1-1.21-1.591L26.964 7.825a5.031 5.031 0 0 1 6.072 0l22.569 17.152a1 1 0 0 1-.606 1.797z"
                />
                <Path
                    style={{
                        fill: "#6c342a",
                    }}
                    d="m59.6 23.586-4.019-3.015L34.414 4.485a7.314 7.314 0 0 0-8.828 0L4.419 20.571.4 23.586a.999.999 0 1 0 1.2 1.599l8-6c.047-.035.073-.084.112-.125L26.796 6.076a5.31 5.31 0 0 1 6.408 0l12.973 9.86a.97.97 0 0 0 .222.249l12 9a1 1 0 0 0 1.201-1.599z"
                />
                <Path
                    style={{
                        fill: "none",
                        stroke: "#6b5b4b",
                        strokeWidth: 2,
                        strokeMiterlimit: 10,
                    }}
                    d="M5 43.997v8"
                />
                <Path
                    style={{
                        fill: "#23a24d",
                    }}
                    d="M9.188 35.677c.304-.768.521-1.625.357-2.444a2.213 2.213 0 0 0-.456-.965 2.063 2.063 0 0 1-.411-1.711c.122-.57.049-1.21-.216-1.721-.483-.931-1.444-1.452-2.399-1.588-.702-.1-1.477.007-1.997.543l-.618.534c-.702.331-1.24 1.064-1.394 1.897-.083.452-.053.926.077 1.364.194.653.033 1.359-.338 1.908-.836 1.236-1.057 3.007-.441 4.409.078.178.179.354.297.513.404.543.556 1.263.387 1.944a3.205 3.205 0 0 0-.08.475c-.066.727.082 1.455.232 2.167.156.74.348 1.539.888 2.003.732.629 1.792.385 2.63-.047 1.184-.611 2.28-1.617 2.698-2.997a3.741 3.741 0 0 0-.141-2.495c-.33-.764-.33-1.671.148-2.33.319-.439.574-.945.777-1.459z"
                />
                <Path
                    style={{
                        fill: "#9e6c53",
                    }}
                    d="M8 56.997H2l-.948-6.267a.3.3 0 0 1 .297-.345h7.308c.181 0 .319.161.292.339L8 56.997z"
                />
            </Svg>)
        case('kitchen'):
            return(  <Svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 57 57"
                xmlSpace="preserve"
            >
                <Path
                    style={{
                        fill: "#d6d9df",
                    }}
                    d="M1.5 0h54v57h-54z"
                />
                <Path
                    style={{
                        fill: "#e7eced",
                    }}
                    d="M1.5 0h54v10h-54z"
                />
                <Path
                    style={{
                        fill: "#556080",
                    }}
                    d="M5.5 3h4v4h-4zM12.5 3h4v4h-4z"
                />
                <Path
                    style={{
                        fill: "#a4ca83",
                    }}
                    d="M28.5 3h24v4h-24z"
                />
                <Path
                    style={{
                        fill: "#a1c8ec",
                    }}
                    d="M6.5 17h44v35h-44z"
                />
                <Path
                    style={{
                        fill: "none",
                        stroke: "#7fabda",
                        strokeWidth: 2,
                        strokeLinejoin: "round",
                        strokeMiterlimit: 10,
                    }}
                    d="M6.5 32h44"
                />
                <Path
                    style={{
                        fill: "#7fabda",
                    }}
                    d="M16.5 32h-6v-5a3 3 0 1 1 6 0v5z"
                />
                <Path
                    style={{
                        fill: "none",
                        stroke: "#7fabda",
                        strokeWidth: 2,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeMiterlimit: 10,
                    }}
                    d="M11.5 20h4M13.5 20v4"
                />
                <Path
                    style={{
                        fill: "#7fabda",
                    }}
                    d="M26.5 32h-6v-5a3 3 0 1 1 6 0v5z"
                />
                <Path
                    style={{
                        fill: "none",
                        stroke: "#7fabda",
                        strokeWidth: 2,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeMiterlimit: 10,
                    }}
                    d="M21.5 20h4M23.5 20v4"
                />
                <Path
                    style={{
                        fill: "#7fabda",
                    }}
                    d="M36.5 32h-6v-5a3 3 0 1 1 6 0v5z"
                />
                <Path
                    style={{
                        fill: "none",
                        stroke: "#7fabda",
                        strokeWidth: 2,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeMiterlimit: 10,
                    }}
                    d="M31.5 20h4M33.5 20v4"
                />
                <Path
                    style={{
                        fill: "#7fabda",
                    }}
                    d="M46.5 32h-6v-5a3 3 0 1 1 6 0v5z"
                />
                <Path
                    style={{
                        fill: "none",
                        stroke: "#7fabda",
                        strokeWidth: 2,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeMiterlimit: 10,
                    }}
                    d="M41.5 20h4M43.5 20v4"
                />
                <Path
                    style={{
                        fill: "#6f98bc",
                    }}
                    d="M23.5 48c0-6.627-5.373-12-12-12-1.787 0-3.476.401-5 1.102V52h16.283a11.84 11.84 0 0 0 .717-4z"
                />
                <Path
                    style={{
                        fill: "#7fabda",
                    }}
                    d="M19.5 48a8 8 0 0 0-8-8c-1.893 0-3.63.661-5 1.76V52h11.918a7.921 7.921 0 0 0 1.082-4z"
                />
                <Path
                    style={{
                        fill: "#568bb2",
                    }}
                    d="M20.5 36c-1.586 0-3.087.33-4.471.891C20.41 38.679 23.5 42.976 23.5 48a11.84 11.84 0 0 1-.717 4h9a11.84 11.84 0 0 0 .717-4c0-6.627-5.373-12-12-12z"
                />
                <Path
                    style={{
                        fill: "#7fabda",
                    }}
                    d="M20.5 40c-.024 0-.047.003-.071.003A11.939 11.939 0 0 1 23.5 48a11.84 11.84 0 0 1-.717 4h4.636a7.921 7.921 0 0 0 1.082-4 8.002 8.002 0 0 0-8.001-8z"
                />
                <Path
                    style={{
                        fill: "#6f98bc",
                    }}
                    d="M29.5 36c-1.586 0-3.087.33-4.471.891C29.41 38.679 32.5 42.976 32.5 48a11.84 11.84 0 0 1-.717 4h9a11.84 11.84 0 0 0 .717-4c0-6.627-5.373-12-12-12z"
                />
                <Path
                    style={{
                        fill: "#7fabda",
                    }}
                    d="M29.5 40c-.024 0-.047.003-.071.003A11.939 11.939 0 0 1 32.5 48a11.84 11.84 0 0 1-.717 4h4.636a7.921 7.921 0 0 0 1.082-4 8.002 8.002 0 0 0-8.001-8z"
                />
                <Path
                    style={{
                        fill: "#568bb2",
                    }}
                    d="M38.5 36c-1.586 0-3.087.33-4.471.891C38.41 38.679 41.5 42.976 41.5 48a11.84 11.84 0 0 1-.717 4h9a11.84 11.84 0 0 0 .717-4c0-6.627-5.373-12-12-12z"
                />
                <Path
                    style={{
                        fill: "#7fabda",
                    }}
                    d="M38.5 40c-.024 0-.047.003-.071.003A11.939 11.939 0 0 1 41.5 48a11.84 11.84 0 0 1-.717 4h4.636a7.921 7.921 0 0 0 1.082-4 8.002 8.002 0 0 0-8.001-8z"
                />
                <Path
                    style={{
                        fill: "#fff",
                    }}
                    d="M51.5 53h-46V16h46v37zm-44-2h42V18h-42v33z"
                />
            </Svg>)
        case('bathroom'):
            return(  <Svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 511.992 511.992"
                xmlSpace="preserve"
            >
                <Path
                    style={{
                        fill: "#ffce54",
                    }}
                    d="M330.646 207.996h128v42.671h-128z"
                />
                <Path
                    style={{
                        fill: "#ed5564",
                    }}
                    d="M42.663 250.67c0 5.891-4.773 10.656-10.664 10.656-5.89 0-10.663-4.766-10.663-10.656 0-5.89 4.773-10.671 10.663-10.671 5.891-.001 10.664 4.78 10.664 10.671z"
                />
                <Path
                    style={{
                        fill: "#5d9cec",
                    }}
                    d="M106.662 250.67c0 5.891-4.773 10.656-10.664 10.656s-10.663-4.766-10.663-10.656c0-5.89 4.772-10.671 10.663-10.671s10.664 4.78 10.664 10.671z"
                />
                <Path
                    style={{
                        fill: "#3bafda",
                    }}
                    d="M88.076 468.275c-6.491 13.188-1.07 29.141 12.125 35.641 13.188 6.5 29.148 1.062 35.641-12.125l50.218-101.998-47.765-23.516-50.219 101.998zM425.993 468.275 375.76 366.277l-47.766 23.516 50.219 101.998c6.5 13.188 22.453 18.625 35.655 12.125 13.188-6.5 18.608-22.453 12.125-35.641z"
                />
                <Path
                    style={{
                        fill: "#4fc2e9",
                    }}
                    d="M10.664 378.668c0 47.124 38.21 85.326 85.334 85.326h319.995c47.124 0 85.343-38.202 85.343-85.326V250.67H10.664v127.998z"
                />
                <G
                    style={{
                        opacity: 0.2,
                    }}
                >
                    <Path
                        style={{
                            fill: "#fff",
                        }}
                        d="M479.992 250.67v127.998c0 47.124-38.203 85.326-85.342 85.326h21.343c47.124 0 85.343-38.202 85.343-85.326V250.67h-21.344z"
                    />
                </G>
                <Path
                    style={{
                        fill: "#ccd1d9",
                    }}
                    d="M127.998 5.33c-41.172 0-74.663 33.5-74.663 74.67v174.669h21.328V80.001h.008c0-29.405 23.921-53.327 53.327-53.327 29.405 0 53.327 23.922 53.327 53.327h21.335c0-41.171-33.491-74.671-74.662-74.671z"
                />
                <Path
                    style={{
                        fill: "#e6e9ed",
                    }}
                    d="M191.997 80.001c-23.57 0-42.672 19.094-42.672 42.671v10.656h85.335v-10.656c0-23.577-19.102-42.671-42.663-42.671z"
                />
                <Path
                    style={{
                        fill: "#5d9cec",
                    }}
                    d="M159.997 175.999c0 5.891-4.773 10.672-10.664 10.672s-10.671-4.781-10.671-10.672c0-5.89 4.78-10.671 10.671-10.671s10.664 4.781 10.664 10.671zM202.66 175.999c0 5.891-4.772 10.672-10.663 10.672s-10.664-4.781-10.664-10.672c0-5.89 4.773-10.671 10.664-10.671s10.663 4.781 10.663 10.671zM245.324 175.999c0 5.891-4.773 10.672-10.664 10.672s-10.664-4.781-10.664-10.672c0-5.89 4.773-10.671 10.664-10.671s10.664 4.781 10.664 10.671zM138.662 218.671c0 5.875-4.773 10.656-10.664 10.656s-10.664-4.781-10.664-10.656c0-5.891 4.773-10.672 10.664-10.672s10.664 4.781 10.664 10.672zM181.333 218.671c0 5.875-4.781 10.656-10.672 10.656s-10.664-4.781-10.664-10.656c0-5.891 4.773-10.672 10.664-10.672s10.672 4.781 10.672 10.672zM223.996 218.671c0 5.875-4.781 10.656-10.672 10.656s-10.664-4.781-10.664-10.656c0-5.891 4.773-10.672 10.664-10.672s10.672 4.781 10.672 10.672zM266.66 218.671c0 5.875-4.773 10.656-10.664 10.656s-10.664-4.781-10.664-10.656c0-5.891 4.773-10.672 10.664-10.672s10.664 4.781 10.664 10.672z"
                />
                <Path
                    style={{
                        fill: "#f6bb42",
                    }}
                    d="M405.337 218.671c0 5.891-4.78 10.656-10.687 10.656-5.875 0-10.656-4.766-10.656-10.656s4.781-10.672 10.656-10.672c5.907 0 10.687 4.781 10.687 10.672zM426.649 239.998c0 5.89-4.766 10.671-10.656 10.671s-10.656-4.781-10.656-10.671c0-5.891 4.766-10.671 10.656-10.671s10.656 4.781 10.656 10.671zM447.992 218.671c0 5.891-4.781 10.656-10.656 10.656-5.906 0-10.687-4.766-10.687-10.656s4.78-10.672 10.687-10.672c5.875 0 10.656 4.781 10.656 10.672zM383.994 239.998c0 5.89-4.781 10.671-10.656 10.671-5.906 0-10.688-4.781-10.688-10.671 0-5.891 4.781-10.656 10.688-10.656 5.875.001 10.656 4.766 10.656 10.656zM362.65 218.671c0 5.891-4.766 10.656-10.656 10.656s-10.656-4.766-10.656-10.656 4.766-10.672 10.656-10.672 10.656 4.781 10.656 10.672z"
                />
                <Path
                    style={{
                        fill: "#3bafda",
                    }}
                    d="M501.336 271.998H10.664C4.773 271.998 0 267.217 0 261.326c0-5.891 4.773-10.656 10.664-10.656h490.672c5.875 0 10.656 4.766 10.656 10.656 0 5.89-4.781 10.672-10.656 10.672z"
                />
            </Svg>)
        case('bedroom'):
            return(
                <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 511.992 511.992"
                    xmlSpace="preserve"
                >
                    <Path
                        style={{
                            fill: "#ccd1d9",
                        }}
                        d="m53.327 223.993-1.391 67.757 129.389-14.406s-10.656-53.351-127.998-53.351z"
                    />
                    <Path
                        style={{
                            fill: "#e6e9ed",
                        }}
                        d="M42.671 266.666h426.65v85.33H42.671z"
                    />
                    <Path
                        style={{
                            fill: "#ccd1d9",
                        }}
                        d="M95.998 330.655c-5.891 0-10.671-4.75-10.671-10.656v-10.656c0-5.906 4.78-10.687 10.671-10.687s10.672 4.78 10.672 10.687v10.656c0 5.906-4.781 10.656-10.672 10.656z"
                    />
                    <Path
                        style={{
                            fill: "#da4453",
                        }}
                        d="M437.32 383.998c-5.891 0-10.655-4.781-10.655-10.656v-10.688c0-5.875 4.765-10.656 10.655-10.656s10.672 4.781 10.672 10.656v10.688c0 5.875-4.781 10.656-10.672 10.656zM394.666 383.998c-5.891 0-10.672-4.781-10.672-10.656v-10.688c0-5.875 4.781-10.656 10.672-10.656s10.655 4.781 10.655 10.656v10.688c0 5.875-4.764 10.656-10.655 10.656zM351.994 383.998c-5.891 0-10.672-4.781-10.672-10.656v-10.688c0-5.875 4.781-10.656 10.672-10.656s10.672 4.781 10.672 10.656v10.688c0 5.875-4.781 10.656-10.672 10.656zM309.323 383.998c-5.891 0-10.656-4.781-10.656-10.656v-10.688c0-5.875 4.766-10.656 10.656-10.656s10.671 4.781 10.671 10.656v10.688c0 5.875-4.781 10.656-10.671 10.656zM266.668 383.998c-5.891 0-10.672-4.781-10.672-10.656v-10.688c0-5.875 4.781-10.656 10.672-10.656s10.656 4.781 10.656 10.656v10.688c0 5.875-4.766 10.656-10.656 10.656zM223.996 383.998c-5.891 0-10.672-4.781-10.672-10.656v-10.688c0-5.875 4.781-10.656 10.672-10.656s10.672 4.781 10.672 10.656v10.688c0 5.875-4.781 10.656-10.672 10.656zM181.325 383.998c-5.891 0-10.656-4.781-10.656-10.656v-10.688c0-5.875 4.766-10.656 10.656-10.656s10.672 4.781 10.672 10.656v10.688c0 5.875-4.781 10.656-10.672 10.656z"
                    />
                    <Path
                        style={{
                            fill: "#ccd1d9",
                        }}
                        d="M138.67 330.655c-5.891 0-10.672-4.75-10.672-10.656v-10.656c0-5.906 4.781-10.687 10.672-10.687 5.89 0 10.655 4.78 10.655 10.687v10.656a10.64 10.64 0 0 1-10.655 10.656z"
                    />
                    <Path
                        style={{
                            fill: "#f4be8e",
                        }}
                        d="M53.326 309.346h405.34v47.624H53.326z"
                    />
                    <Path
                        style={{
                            fill: "#ed5564",
                        }}
                        d="M170.666 266.666h298.65v106.68h-298.65z"
                    />
                    <Path
                        style={{
                            fill: "#ffce54",
                        }}
                        d="M245.326 266.666h149.31v32.21h-149.31z"
                    />
                    <Path
                        style={{
                            fill: "#ffd2a6",
                        }}
                        d="M31.999 117.338c-17.64 0-31.999 14.359-31.999 32v245.316h63.999V149.338c0-17.641-14.359-32-32-32zM479.992 202.665c-17.641 0-32 14.359-32 31.999v159.99h64v-159.99c0-17.64-14.359-31.999-32-31.999z"
                    />
                </Svg>
            )
        case('garden'):
            return(  <Svg

                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
            >
                <Path
                    style={{
                        fill: "#76cc5b",
                    }}
                    d="M256 263.972c4.852-39.758-37.575-81.091-59.333-59.333s19.575 64.185 59.333 59.333z"
                />
                <Path
                    style={{
                        fill: "#76cc5b",
                    }}
                    d="M256 263.972c-4.852-39.758 37.575-81.091 59.333-59.333S295.759 268.824 256 263.972z"
                />
                <Path
                    style={{
                        fill: "#8fe673",
                    }}
                    d="M256 263.972c31.545-24.682 30.77-83.91 0-83.91s-31.545 59.227 0 83.91z"
                />
                <Path
                    style={{
                        fill: "#599944",
                    }}
                    d="M298.345 221.628a8.137 8.137 0 0 0-11.506 0l-22.704 22.704v-32.109a8.135 8.135 0 1 0-16.27 0v32.109l-22.704-22.704a8.135 8.135 0 0 0-11.505 11.505l36.592 36.592c.19.19.388.369.597.539.094.078.195.146.293.219.114.086.227.175.345.254.118.079.241.148.361.219.107.064.212.131.321.19.124.066.251.123.377.182.114.054.226.111.343.159.124.051.249.092.376.138.125.044.248.092.375.131.126.038.254.066.381.098.131.033.259.069.393.095.144.028.29.046.434.066.118.017.234.039.354.051a8.287 8.287 0 0 0 1.606 0c.12-.012.239-.035.359-.052.143-.021.286-.037.428-.066.136-.027.269-.064.402-.098.123-.031.247-.059.369-.095.132-.04.259-.09.388-.136.104-.037.209-.067.311-.11l.051-.024c.121-.05.239-.11.358-.166.104-.049.21-.091.313-.145.017-.009.034-.021.05-.029.115-.062.225-.131.335-.199.116-.069.234-.136.348-.212.121-.081.236-.172.354-.26.095-.072.193-.138.286-.214.207-.17.407-.349.596-.539l36.592-36.592a8.13 8.13 0 0 0 .001-11.501z"
                />
                <Path
                    style={{
                        fill: "#76cc5b",
                    }}
                    d="M91.393 263.972c4.852-39.758-37.575-81.091-59.333-59.333s19.575 64.185 59.333 59.333z"
                />
                <Path
                    style={{
                        fill: "#76cc5b",
                    }}
                    d="M91.393 263.972c-4.852-39.758 37.575-81.091 59.333-59.333s-19.574 64.185-59.333 59.333z"
                />
                <Path
                    style={{
                        fill: "#8fe673",
                    }}
                    d="M91.393 263.972c31.545-24.682 30.77-83.91 0-83.91s-31.545 59.227 0 83.91z"
                />
                <Path
                    style={{
                        fill: "#599944",
                    }}
                    d="M133.738 221.628a8.135 8.135 0 0 0-11.505 0l-22.704 22.704v-32.109a8.135 8.135 0 0 0-16.27 0v32.109l-22.704-22.704a8.137 8.137 0 0 0-11.506 11.505l36.592 36.592c.189.19.388.369.596.539.095.078.195.146.294.219.114.086.226.175.345.254.117.079.241.148.361.219.107.064.212.131.321.19.124.066.252.123.379.182.114.054.226.111.343.159.124.051.251.092.376.138.125.044.248.092.375.131.126.038.253.066.381.098.13.033.259.069.393.095.143.028.29.046.434.066.118.017.234.039.354.051a8.287 8.287 0 0 0 1.606 0c.121-.012.239-.035.359-.052.143-.021.286-.037.428-.066.136-.027.269-.064.402-.098.124-.031.247-.059.369-.095.132-.04.259-.09.388-.136.104-.037.209-.067.312-.11l.051-.024c.121-.05.239-.11.357-.166.104-.049.21-.091.313-.145.017-.009.033-.021.05-.029.114-.062.223-.131.335-.199.116-.069.234-.136.347-.212.123-.081.236-.172.354-.26.095-.072.193-.138.286-.214.207-.17.407-.349.597-.539l36.592-36.592a8.131 8.131 0 0 0-.001-11.501z"
                />
                <Path
                    style={{
                        fill: "#5b83cc",
                    }}
                    d="M208.028 323.44c-1.586-5.902-2.442-12.199-2.442-18.736 0-33.559 22.571-60.763 50.414-60.763s50.414 27.205 50.414 60.763c0 6.539-.857 12.837-2.443 18.739l-48.354-13.991-47.589 13.988z"
                />
                <Path
                    d="M227.281 304.703c0-29.068 16.939-53.355 39.566-59.338A42.339 42.339 0 0 0 256 243.94c-27.843 0-50.414 27.205-50.414 60.763 0 6.538.857 12.834 2.442 18.736l20.372-5.989a73.174 73.174 0 0 1-1.119-12.747z"
                    style={{
                        opacity: 0.2,
                    }}
                />
                <Path
                    style={{
                        fill: "#5b83cc",
                    }}
                    d="M141.529 311.122c.183-2.109.278-4.251.278-6.418 0-33.559-22.571-60.763-50.414-60.763S40.98 271.145 40.98 304.704c0 2.203.098 4.379.287 6.521l49.743 15.134 50.519-15.237z"
                />
                <Path
                    style={{
                        opacity: 0.2,
                        enableBackground: "new",
                    }}
                    d="M62.962 311.225a73.81 73.81 0 0 1-.287-6.521c0-29.068 16.939-53.355 39.566-59.338a42.339 42.339 0 0 0-10.847-1.425c-27.843 0-50.414 27.205-50.414 60.763 0 2.203.098 4.379.287 6.521l49.743 15.134 10.894-3.286-38.942-11.848z"
                />
                <Path
                    style={{
                        fill: "#76cc5b",
                    }}
                    d="M420.606 263.972c-4.852-39.758 37.575-81.091 59.333-59.333 21.759 21.757-19.574 64.185-59.333 59.333z"
                />
                <Path
                    style={{
                        fill: "#76cc5b",
                    }}
                    d="M420.606 263.972c4.852-39.758-37.575-81.091-59.333-59.333-21.759 21.757 19.575 64.185 59.333 59.333z"
                />
                <Path
                    style={{
                        fill: "#8fe673",
                    }}
                    d="M420.606 263.972c-31.545-24.682-30.77-83.91 0-83.91s31.545 59.227 0 83.91z"
                />
                <Path
                    style={{
                        fill: "#599944",
                    }}
                    d="M378.262 221.628a8.135 8.135 0 0 1 11.505 0l22.704 22.704v-32.109a8.135 8.135 0 0 1 16.27 0v32.109l22.704-22.704a8.137 8.137 0 0 1 11.506 11.505l-36.592 36.592a7.81 7.81 0 0 1-.596.539c-.095.078-.195.146-.294.219-.114.086-.226.175-.345.254-.117.079-.241.148-.361.219-.107.064-.212.131-.321.19-.124.066-.252.123-.379.182-.114.054-.226.111-.343.159-.124.051-.251.092-.376.138-.125.044-.248.092-.375.131-.126.038-.253.066-.381.098-.13.033-.259.069-.393.095-.143.028-.29.046-.434.066-.118.017-.234.039-.354.051a8.287 8.287 0 0 1-1.606 0c-.121-.012-.239-.035-.359-.052-.143-.021-.286-.037-.428-.066-.136-.027-.269-.064-.402-.098-.124-.031-.247-.059-.369-.095-.132-.04-.259-.09-.388-.136-.104-.037-.209-.067-.312-.11l-.051-.024c-.121-.05-.239-.11-.357-.166-.104-.049-.21-.091-.313-.145-.017-.009-.033-.021-.05-.029-.114-.062-.223-.131-.335-.199-.116-.069-.234-.136-.347-.212-.123-.081-.236-.172-.354-.26-.095-.072-.193-.138-.286-.214a8.224 8.224 0 0 1-.597-.539l-36.592-36.592a8.131 8.131 0 0 1 .001-11.501z"
                />
                <Path
                    style={{
                        fill: "#5b83cc",
                    }}
                    d="M370.47 311.122a74.253 74.253 0 0 1-.278-6.418c0-33.559 22.571-60.763 50.414-60.763s50.414 27.205 50.414 60.763c0 2.203-.098 4.379-.287 6.521l-49.743 15.134-50.52-15.237z"
                />
                <Path
                    style={{
                        opacity: 0.2,
                        enableBackground: "new",
                    }}
                    d="M392.165 311.122a74.253 74.253 0 0 1-.278-6.418c0-29.068 16.94-53.355 39.566-59.338a42.339 42.339 0 0 0-10.847-1.425c-27.843 0-50.414 27.205-50.414 60.763 0 2.168.094 4.309.278 6.418l50.519 15.237 10.801-3.286-39.625-11.951z"
                />
                <Path
                    style={{
                        fill: "#b5763b",
                    }}
                    d="M311.08 331.938c-10.698 0-21.395-2.411-31.147-7.235-14.987-7.412-32.88-7.412-47.867 0-19.503 9.648-42.791 9.648-62.295 0-14.987-7.413-32.88-7.413-47.867 0-19.503 9.648-42.791 9.648-62.295 0-14.987-7.412-32.88-7.412-47.867 0a8.135 8.135 0 0 1-7.214-14.584c19.503-9.648 42.791-9.648 62.295 0 14.987 7.412 32.88 7.413 47.867 0 19.503-9.648 42.791-9.648 62.295 0 14.987 7.413 32.88 7.413 47.867 0 19.503-9.648 42.791-9.648 62.295 0 14.987 7.413 32.88 7.413 47.867 0 19.503-9.648 42.791-9.648 62.295 0 14.987 7.413 32.88 7.413 47.867 0 19.503-9.648 42.791-9.648 62.295 0a8.135 8.135 0 0 1 3.685 10.899 8.135 8.135 0 0 1-10.899 3.685c-14.987-7.413-32.88-7.413-47.867 0-19.503 9.648-42.791 9.648-62.295 0-14.987-7.413-32.881-7.413-47.867 0-9.752 4.823-20.45 7.235-31.148 7.235z"
                />
            </Svg>)
        case('other'):
            return(  <Svg

                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="iconify iconify--twemoji"
            >
                <Path
                    fill="#A0041E"
                    d="M9.344 14.702h-2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5z"
                />
                <Path fill="#FFE8B6" d="M5 16 18 3l13 13v17H5z" />
                <Path fill="#FFCC4D" d="M18 16h1v16h-1z" />
                <Path
                    fill="#66757F"
                    d="M31 17a.997.997 0 0 1-.707-.293L18 4.414 5.707 16.707a.999.999 0 1 1-1.414-1.414l13-13a.999.999 0 0 1 1.414 0l13 13A.999.999 0 0 1 31 17z"
                />
                <Path
                    fill="#66757F"
                    d="M18 17a.999.999 0 0 1-.707-1.707l6.5-6.5a.999.999 0 1 1 1.414 1.414l-6.5 6.5A.997.997 0 0 1 18 17z"
                />
                <Path fill="#C1694F" d="M10 26h4v6h-4z" />
                <Path fill="#55ACEE" d="M10 17h4v4h-4zm12.5 0h4v4h-4zm0 9h4v4h-4z" />
                <Path
                    fill="#5C913B"
                    d="M33.5 33.5A1.5 1.5 0 0 1 32 35H4a1.5 1.5 0 0 1 0-3h28a1.5 1.5 0 0 1 1.5 1.5z"
                />
            </Svg>)
        case('entry'):
            return(  <Svg

                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="iconify iconify--twemoji"
            >
                <Path
                    fill="#A0041E"
                    d="M9.344 14.702h-2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5z"
                />
                <Path fill="#FFE8B6" d="M5 16 18 3l13 13v17H5z" />
                <Path fill="#FFCC4D" d="M18 16h1v16h-1z" />
                <Path
                    fill="#66757F"
                    d="M31 17a.997.997 0 0 1-.707-.293L18 4.414 5.707 16.707a.999.999 0 1 1-1.414-1.414l13-13a.999.999 0 0 1 1.414 0l13 13A.999.999 0 0 1 31 17z"
                />
                <Path
                    fill="#66757F"
                    d="M18 17a.999.999 0 0 1-.707-1.707l6.5-6.5a.999.999 0 1 1 1.414 1.414l-6.5 6.5A.997.997 0 0 1 18 17z"
                />
                <Path fill="#C1694F" d="M10 26h4v6h-4z" />
                <Path fill="#55ACEE" d="M10 17h4v4h-4zm12.5 0h4v4h-4zm0 9h4v4h-4z" />
                <Path
                    fill="#5C913B"
                    d="M33.5 33.5A1.5 1.5 0 0 1 32 35H4a1.5 1.5 0 0 1 0-3h28a1.5 1.5 0 0 1 1.5 1.5z"
                />
            </Svg>)
    }
}

export default GetRoomImage;