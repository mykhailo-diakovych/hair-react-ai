import { useUpdateEffect } from "react-use";
import React, { useState } from "react";
import { UploadPhoto } from "@features/clinic/patients/profile/components/UploadPhotoCard/UploadPhotoCard";
import {
  RedoUndoControl,
  StyledRedoUndoControls
} from "@features/clinic/patients/profile/components/UploadPhotoCard/components/EditPhotoCard/components/RedoUndoControls/styled/RedoUndoControls.styled";

import { HistoryState } from "../../../../../../../../../../interfaces/historyState.interface";

export const EditorRedoUndoControls = ({
  croppedImagesHistory,
  updatePhotoCard,
  isLoading
}: {
  croppedImagesHistory: HistoryState<UploadPhoto | undefined>;
  updatePhotoCard: () => void;
  isLoading: boolean;
}) => {
  const [isTriggerRedoUndo, setIsTriggerRedoUndo] = useState(false);

  useUpdateEffect(() => {
    if (isTriggerRedoUndo) {
      setIsTriggerRedoUndo(false);

      updatePhotoCard();
    }
  }, [isTriggerRedoUndo]);

  return (
    <StyledRedoUndoControls column compact centerY gap={10} top={10} left={10}>
      <RedoUndoControl
        disabled={croppedImagesHistory.position === 0 || isLoading}
        iconName={isLoading ? "common/spinner" : "model/controls/undo"}
        onClick={() => {
          croppedImagesHistory.back();
          setIsTriggerRedoUndo(true);
        }}
      />

      <RedoUndoControl
        disabled={
          croppedImagesHistory.position ===
          croppedImagesHistory.history.length - 1
        }
        iconName={isLoading ? "common/spinner" : "model/controls/redo"}
        onClick={() => {
          croppedImagesHistory.forward();
          setIsTriggerRedoUndo(true);
        }}
      />
    </StyledRedoUndoControls>
  );
};
