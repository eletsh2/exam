import { useState } from "react";

export type timerResultsObject = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export interface TimerOptions {
  endDate: string;
  onTick?: (obj: timerResultsObject) => void;
  onFinished?: (obj: timerResultsObject) => void;
}

export class Timer {
  public seconds = 0;
  public minutes = 0;
  public hours = 0;
  public days = 0;

  public ms = 0;

  public interval: NodeJS.Timer | null = null;

  public status: "stopped" | "running" | "paused" = "stopped";

  public onTick: (obj: timerResultsObject) => void = () => {};
  public onFinished: (obj: timerResultsObject) => void = () => {};

  constructor({ endDate, onTick, onFinished }: TimerOptions) {
    this.initialize(new Date(endDate).getTime() - new Date().getTime());
    if (onTick) this.onTick = onTick;
    if (onFinished) this.onFinished = onFinished;
  }

  private initialize(ms: number) {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const daysMs = ms % (24 * 60 * 60 * 1000);
    const hours = Math.floor(daysMs / (60 * 60 * 1000));
    const hoursMs = ms % (60 * 60 * 1000);
    const minutes = Math.floor(hoursMs / (60 * 1000));
    const minutesMs = ms % (60 * 1000);
    const seconds = Math.floor(minutesMs / 1000);

    this.ms = ms;

    this.days = days;
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }

  stop() {
    if (this.interval) clearInterval(this.interval);
    this.status = "stopped";
  }

  pause() {
    this.status = "paused";
  }

  resume() {
    switch (this.status) {
      case "paused":
        this.status = "running";
        break;

      case "stopped":
        this.start();
        break;
    }
  }

  public start() {
    if (this.interval) clearInterval(this.interval);
    this.status = "running";

    this.interval = setInterval(() => {
      if (this.status !== "paused") {
        if (this.seconds > 0) {
          this.seconds--;
        }

        if (this.seconds === 0 && this.minutes > 0) {
          this.minutes--;
          this.seconds = 59;
        }

        if (this.minutes === 0 && this.hours > 0) {
          this.hours--;
          this.minutes = 59;
          this.seconds = 59;
        }

        if (this.hours === 0 && this.days > 0) {
          this.days--;
          this.hours = 23;
          this.minutes = 59;
          this.seconds = 59;
        }

        this.onTick?.({
          days: this.days,
          hours: this.hours,
          minutes: this.minutes,
          seconds: this.seconds,
        });

        if (
          this.seconds === 0 &&
          this.minutes === 0 &&
          this.hours === 0 &&
          this.days === 0
        ) {
          this.onFinished?.({
            days: this.days,
            hours: this.hours,
            minutes: this.minutes,
            seconds: this.seconds,
          });
          this.stop();
        }
      }
    }, 1000);
  }
}

export function useTimer({
  endDate,
  onFinished,
}: Omit<TimerOptions, "onTick">) {
  const [time, setTime] = useState("");

  const timer = new Timer({
    endDate,
    onTick(obj) {
      setTime(`${obj.hours}:${obj.minutes}:${obj.seconds}`);
    },
    onFinished,
  });

  return { time, timer };
}
