import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getExamById } from "../services";

export function useExam() {
  const params = useParams();

  const { data, isLoading } = useQuery(
    [`get-exam-${params.id}`, params.id],
    () => getExamById(params?.id || ""),
    {
      cacheTime: 0,
    }
  );

  return {
    exam: data?.data ? data?.data : null,
    isLoading,
  };
}
