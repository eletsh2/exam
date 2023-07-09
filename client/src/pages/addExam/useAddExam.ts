import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getExamById } from "../services";

interface useAddExamProps {
  target: "update" | "add";
}

export function useAddExam({ target }: useAddExamProps) {
  const params = useParams();

  const { data, isLoading } = useQuery(
    [`${target}-exam-${params.id}`, target],
    () => getExamById(params?.id || ""),
    {
      enabled: target === "update",
      cacheTime: 0,
    }
  );

  return {
    exam: data?.data ? data?.data : null,
    isLoading,
  };
}
