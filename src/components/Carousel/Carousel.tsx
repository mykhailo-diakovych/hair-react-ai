import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import React, { useEffect, useRef, useState } from "react";
import { useDebounceFn } from "@reactuses/core";
import { FlexGroup, FlexGroupProps } from "@components/FlexGroup/FlexGroup";
import { CarouselWrapper } from "@components/Carousel/styled/CarouselWrapper.styled";
import { CarouselOuter } from "@components/Carousel/styled/CarouselOuter.styled";
import { ButtonIcon } from "@components/Button/styled/ButtonIcon.styled";

import "swiper/css";
import "swiper/css/navigation";

interface CarouselProps {
  items:
    | {
        id: string;
        children: React.ReactNode;
      }[]
    | undefined;
  itemsPerView?: number;
  navigation?: {
    prevEl: React.RefObject<HTMLButtonElement | null>;
    nextEl: React.RefObject<HTMLButtonElement | null>;
  };
  containerProps?: FlexGroupProps;
  wrapperProps?: FlexGroupProps;
  swiperProps?: SwiperProps;
  dynamicSlides?: boolean;
  $centered?: boolean;
}

export const Carousel = ({
  items,
  itemsPerView = 3,
  navigation,
  containerProps,
  wrapperProps,
  swiperProps,
  dynamicSlides = false,
  $centered
}: CarouselProps) => {
  const swiperRef = useRef<any>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);
  const navigationPrevRef = useRef<HTMLButtonElement>(null);

  const [slidePerView, setSlidePerView] = useState<number | "auto">(
    itemsPerView
  );

  const handleChangeSliderParams = useDebounceFn(() => {
    if (swiperRef.current && items) {
      const sliderSlidePerView =
        swiperRef.current?.swiper?.params.slidesPerView;

      if (sliderSlidePerView === 1) {
        setSlidePerView(1);
      } else {
        setSlidePerView(
          items && items?.length < sliderSlidePerView
            ? "auto"
            : Math.min(items?.length, itemsPerView)
        );
      }
    }
  }, 200);

  useEffect(() => {
    if (dynamicSlides) {
      handleChangeSliderParams.run();

      window.addEventListener("resize", () => {
        handleChangeSliderParams.run();
      });

      setTimeout(() => {
        handleChangeSliderParams.run();
      }, 500);
    }
  }, [items]);

  return (
    <CarouselOuter
      $expandSlides={slidePerView === "auto"}
      $slidePerView={slidePerView}
      {...containerProps}
      style={{
        ...(containerProps?.style || {})
      }}
    >
      <CarouselWrapper $centered={$centered} {...wrapperProps}>
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          spaceBetween={20}
          allowTouchMove={false}
          slidesPerView={slidePerView}
          navigation={{
            prevEl: navigation?.prevEl.current || navigationPrevRef.current,
            nextEl: navigation?.nextEl.current || navigationNextRef.current
          }}
          breakpoints={
            swiperProps?.breakpoints || {
              768: {
                slidesPerView: itemsPerView
              },
              568: {
                slidesPerView: items?.length === 1 ? "auto" : 2
              },
              0: {
                slidesPerView: 1
              }
            }
          }
          onBeforeInit={(swiper) => {
            swiper.navigation.nextEl =
              navigationNextRef.current as HTMLButtonElement;
            swiper.navigation.prevEl =
              navigationPrevRef.current as HTMLButtonElement;
          }}
          {...swiperProps}
        >
          {items?.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <FlexGroup compact style={{ height: "100%" }}>
                  {item.children}
                </FlexGroup>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </CarouselWrapper>

      {!navigation && (
        <>
          <ButtonIcon
            $buttonIconBg
            ref={navigationPrevRef}
            className={"swiper-navigation-button swiper-button-prev"}
            iconName={"pagination/arrow-left"}
            iconStyle={{ width: 12, height: 12 }}
          />

          <ButtonIcon
            $buttonIconBg
            ref={navigationNextRef}
            className={"swiper-navigation-button swiper-button-next"}
            iconName={"pagination/arrow-right"}
            iconStyle={{ width: 12, height: 12 }}
          />
        </>
      )}
    </CarouselOuter>
  );
};
