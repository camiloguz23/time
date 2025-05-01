export class TimeHelperFormat {

  static monthToName(month: number) {
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const monthName = months[month];
    return monthName;
  }

  static minutesToHours(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}-h ${remainingMinutes}-m`;
  }
}
