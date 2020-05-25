// Content //
interface IGame {
    Amount: number;
    LastCallTime: number;
    Duration: number;
}
export class Game {
    public Amount = 0;
    public Duration = 0;
    public LastCallTime = 0;
    public LastCalled = false;
    public RollCalled = false;
    public Participants: string[] = [];
    constructor(payload: IGame) {
        this.Amount = payload.Amount;
        this.Duration = GetTime() + payload.Duration;
        this.LastCallTime = GetTime() + payload.LastCallTime;
    }
}