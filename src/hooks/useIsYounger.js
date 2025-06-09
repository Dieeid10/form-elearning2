import { useDataStudent } from "./useDataStudent"

export function useIsYounger () {
  const { updateData } = useDataStudent()

  const isYounger = async (date) => {
    try {
      const partesFecha = date.split('-');
      const year = parseInt(partesFecha[0]);
      const month = parseInt(partesFecha[1] - 1);
      const day = parseInt(partesFecha[2]);

      const dateOfBirth = new Date(year, month, day);
      const currentDate = new Date();

      const differenceMS = currentDate - dateOfBirth;
      const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
      const differenceYears = differenceMS / millisecondsInYear;

      const resultYounger = Math.floor(differenceYears) < 18;

      return resultYounger

    } catch (error) {
        console.error("Error en isYounger:", error);
        throw error;
    }

  }

  return { isYounger }
}