import { useBlocker } from "react-router-dom";
import { useEffect } from "react";

export function useUnsavedChangesWarning(isDirty: boolean) {
  const blocker = useBlocker(isDirty);

  useEffect(() => {
    if (blocker.state === "blocked") {
      const confirmLeave = window.confirm(
        "未保存の変更があります。ページを離れますか？",
      );

      if (confirmLeave) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker]);
}
