import { useUpdateEffect } from "react-use";
import React, { useEffect, useState } from "react";
import interact from "interactjs";
import { useQueryClient } from "@tanstack/react-query";
import { Model } from "@services/Model/interfaces/Model.interface";
import { useDebounceEffect } from "@hooks/useDebounceEffect";
import { useUpdateModelFieldsMutation } from "@hooks/query/model/useUpdateModelFieldsMutation";
import { SimulationCanvasZoomControls } from "@features/simulation/home/components/SimulationCanvasControlsWrapper/styled/SimulationCanvasZoomControls.styled";
import { SimulationCanvasControls } from "@features/simulation/home/components/SimulationCanvasControlsWrapper/styled/SimulationCanvasControls.styled";
import { SimulationCanvasControl } from "@features/simulation/home/components/SimulationCanvasControlsWrapper/styled/SimulationCanvasControl.styled";
import { API_SERVICES, ZOOM_DEFAULT_OPTIONS } from "@config/constants";
import { Switch } from "@components/Switch/styled/Switch.styled";
import { Paragraph } from "@components/Paragraph/Paragraph";
import { GroupItems } from "@components/GroupItems/GroupItems";
import { ButtonIcon } from "@components/Button/styled/ButtonIcon.styled";

export const SimulationCanvasControlsWrapper = ({
  onChange,
  canvas,
  currentHistoryIndex,
  setCurrentHistoryIndex,
  effectVisible,
  toggleEffectVisible,
  isSwitchingGalleryImage,
  isUpdatingHistory,
  model
}: {
  changesHistorySize: number;
  currentModelState: number;
  onChange?: (value: number) => void | any;
  currentHistoryIndex?: number;
  setCurrentHistoryIndex: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  canvas: HTMLCanvasElement | null;
  effectVisible: boolean;
  isSwitchingGalleryImage: React.MutableRefObject<boolean>;
  isUpdatingHistory: React.MutableRefObject<boolean>;
  toggleEffectVisible: React.Dispatch<React.SetStateAction<boolean>>;
  model?: Model | null;
}) => {
  const updateModelFieldsMutation = useUpdateModelFieldsMutation();

  const [zoom, setZoom] = useState(ZOOM_DEFAULT_OPTIONS.defaultZoom);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const queryClient = useQueryClient();

  const handleUpdateModelMutation = async (newHistoryIndex: number) => {
    const effectSettings = model?.effect_settings?.history || [];

    return new Promise((resolve) => {
      updateModelFieldsMutation(
        {
          id: model?.id,
          effect_settings: {
            historyIndex: newHistoryIndex,
            history: effectSettings
            // historyIndex: 0,
            // history: []
          }
        },
        {
          onSuccess: (data) => {
            resolve(true);
          },
          onError: () => {
            resolve(false);
          }
        }
      );
    });
  };

  useDebounceEffect(
    async () => {
      if (
        currentHistoryIndex &&
        currentHistoryIndex !== model?.effect_settings?.historyIndex &&
        !isSwitchingGalleryImage.current &&
        !isUpdatingHistory.current
      ) {
        await handleUpdateModelMutation(currentHistoryIndex);

        await queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey.includes(API_SERVICES.MODEL.invalidationKey)
        });
      }
    },
    1000,
    [model, currentHistoryIndex, isSwitchingGalleryImage.current]
  );

  useUpdateEffect(() => {
    if (
      !currentHistoryIndex &&
      model?.effect_settings?.historyIndex &&
      currentHistoryIndex !== model?.effect_settings?.historyIndex
    ) {
      setCurrentHistoryIndex?.(model?.effect_settings?.historyIndex);
    }
  }, [model?.effect_settings?.historyIndex]);

  const handleChangeZoom = (zoomIn = true) => {
    setZoom((prevZoom: number) => {
      const currentZoom =
        ((prevZoom +
          (zoomIn ? 1 : 0) * ZOOM_DEFAULT_OPTIONS.zoomStep -
          (zoomIn ? 1 : -1) * ZOOM_DEFAULT_OPTIONS.minZoom) %
          (ZOOM_DEFAULT_OPTIONS.maxZoom - ZOOM_DEFAULT_OPTIONS.minZoom)) +
        ZOOM_DEFAULT_OPTIONS.minZoom;

      return currentZoom;
    });
  };

  useEffect(() => {
    if (canvas) {
      const normalizedZoom = zoom / ZOOM_DEFAULT_OPTIONS.minZoom;

      const gl = canvas?.getContext("webgl2");

      canvas.style.transform = `scale(${normalizedZoom}) translate(${x}px, ${y}px)`;
      canvas.style.transformOrigin = "top center";

      gl?.viewport(
        0,
        0,
        canvas.width * normalizedZoom,
        canvas.height * normalizedZoom
      );
    }
  }, [zoom, x, y]);

  const handleMoveCanvas = (event: any) => {
    setX((prev) => prev + event.dx);
    setY((prev) => prev + event.dy);
  };

  useEffect(() => {
    const element = document.getElementById("deepar-canvas") as HTMLElement;

    interact(element)
      .gesturable({
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: "parent",
            endOnly: true
          })
        ],
        listeners: {
          start(event) {
            event.target.style.cursor = "grabbing";
          },
          move(event) {
            setZoom((prevZoom) => {
              return Math.round(
                Math.max(
                  ZOOM_DEFAULT_OPTIONS.minZoom,
                  Math.min(
                    ZOOM_DEFAULT_OPTIONS.maxZoom,
                    prevZoom + event.ds * 100
                  )
                )
              );
            });

            handleMoveCanvas(event);
          }
        }
      })
      .draggable({
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: "parent",
            endOnly: true
          })
        ],
        listeners: {
          start(event) {
            event.target.style.cursor = "grabbing";
          },
          move(event) {
            const isTouchDevice = function () {
              return "ontouchstart" in window || "onmsgesturechange" in window;
            };

            if (!isTouchDevice()) {
              handleMoveCanvas(event);
            }
          },
          end(event) {
            event.target.style.cursor = "grab";
          }
        }
      });
  }, [canvas, zoom]);

  return (
    <GroupItems>
      <SimulationCanvasControls compact centerY gap={10} top={20} left={20}>
        <SimulationCanvasControl
          disabled={!effectVisible}
          iconName={"model/controls/undo"}
          onClick={async () => {
            setCurrentHistoryIndex?.((prevHistoryIndex) => {
              const historyIndex = Math.max(
                (prevHistoryIndex ??
                  model?.effect_settings?.historyIndex ??
                  1) - 1,
                1
              );

              if (onChange) {
                onChange(historyIndex);
              }

              return historyIndex;
            });
          }}
        />

        <SimulationCanvasControl
          disabled={!effectVisible}
          iconName={"model/controls/redo"}
          onClick={async () => {
            setCurrentHistoryIndex?.((prevHistoryIndex) => {
              const historyIndex = Math.min(
                (prevHistoryIndex ??
                  model?.effect_settings?.historyIndex ??
                  1) + 1,
                model?.effect_settings?.history?.length as number
              );

              if (onChange) {
                onChange(historyIndex);
              }

              return historyIndex;
            });
          }}
        />
      </SimulationCanvasControls>

      <SimulationCanvasZoomControls gap={2} centerY bottom={20} left={20}>
        <ButtonIcon
          style={{
            width: 24,
            height: 24,
            flex: "0 0 24px"
          }}
          iconName={"model/controls/zoom-in"}
          onClick={() => handleChangeZoom(true)}
        />

        <Paragraph size={"lg"}>{zoom}%</Paragraph>

        <ButtonIcon
          style={{
            width: 24,
            height: 24,
            flex: "0 0 24px"
          }}
          iconName={"model/controls/zoom-out"}
          onClick={() => handleChangeZoom(false)}
        />
      </SimulationCanvasZoomControls>

      <SimulationCanvasControls
        style={{ width: "auto" }}
        bottom={15}
        right={15}
      >
        <Switch checked={effectVisible} onChange={toggleEffectVisible} />
      </SimulationCanvasControls>
    </GroupItems>
  );
};
