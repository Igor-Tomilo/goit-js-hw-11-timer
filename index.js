class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.isActive = false;
    this.selector = selector;
    this.targetDate = targetDate;
    this.onTick = this.updateTimeFields;
    this.daysValueField = document.querySelector(
      `${this.selector} [data-value=days]`,
    );
    this.hoursValueField = document.querySelector(
      `${this.selector} [data-value=hours]`,
    );
    this.minsValueField = document.querySelector(
      `${this.selector} [data-value=mins]`,
    );
    this.secsValueField = document.querySelector(
      `${this.selector} [data-value=secs]`,
    );

    this.init();
  }

  init() {
    const zeroTime = this.getTimeComponents(
      this.targetDate.getTime() - Date.now(),
    );
    this.onTick(zeroTime);
  }

  getTimeComponents(time) {
    const days = this.parDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.par(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.par(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.par(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  par(value) {
    return String(value).padStart(2, '0');
  }

  parDays(value) {
    const newDateValue = String(value).padStart(3, '0');
    if (newDateValue[0] === '0') {
      return newDateValue.slice(1);
    }
    return newDateValue;
  }

  startTimer() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate.getTime() - currentTime;
      const time = this.getTimeComponents(deltaTime);
      this.onTick(time);
    }, 1000);
  }

  updateTimeFields({ days, hours, mins, secs }) {
    this.daysValueField.textContent = days;
    this.hoursValueField.textContent = hours;
    this.minsValueField.textContent = mins;
    this.secsValueField.textContent = secs;
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('June 18, 2021'),
});
timer.startTimer.call(timer);
