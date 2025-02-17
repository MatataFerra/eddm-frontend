export class DateParser {
  date: Date;

  constructor(date: string | Date) {
    if (typeof date === "string") {
      const checkedDate = DateParser.checkCorrectFormat(date);

      if (checkedDate) {
        this.date = DateParser.parse(date);
      } else {
        throw new Error("Incorrect date format");
      }
    } else {
      this.date = date;
    }
  }

  private static checkCorrectFormat(date: string) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

    return dateRegex.test(date);
  }

  private static parse(date: string) {
    return new Date(date);
  }

  format() {
    return this.date.toISOString();
  }

  formatToHuman() {
    return this.date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  formatToHumanShort() {
    return this.date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  formatHumanToString() {
    return new Date(this.date)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      .toString();
  }
}
