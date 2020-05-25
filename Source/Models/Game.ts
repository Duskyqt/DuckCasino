// Content //
interface IGame {
    Amount: number;
    LastCallTime: number;
    Duration: number;
}
export class Game {
    public Active = false;
    public Amount = 0;
    public Duration = 0;
    public LastCallTime = 0;
    public LastCalled = false;
    public RollCalled = false;
    public Participants: string[] = [];
    constructor(payload: IGame) {
        this.Active = true;
        this.Amount = payload.Amount;
        this.Duration = GetTime() + payload.Duration;
        this.LastCallTime = GetTime() + payload.LastCallTime;
        print("Making Game!", this.Amount, this.Duration, this.LastCallTime)
    }
}