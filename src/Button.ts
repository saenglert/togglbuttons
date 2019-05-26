import { Gpio } from "onoff";

export default class Button {
    private gpio: Gpio;
    private id: number;
    private description: string;
    private wid: number;
    private pid: number;
    private ready: boolean;

    constructor(id: number, description: string, wid: number, pid: number) {
        this.id = id;
        this.gpio = new Gpio(this.id, "in", "rising");
        this.description = description.trim();
        this.wid = wid;
        this.pid = pid;
        this.ready = this.valid();
        this.gpio.watch(this.onPress);
    }

    public setDescription = (description: string) => {
        this.description = description.trim();
    }

    public getDescription = () => this.description;

    public setWid = (wid: number) => {
        this.wid = wid;
    }

    public getWid = () => this.wid;

    public setPid = (pid: number) => {
        this.pid = pid;
    }

    public getPid = () => this.pid;

    public valid = () => {
        if (this.description !== "") {
            if (this.wid >= 0) {
                if (this.pid >= 0) {
                    return true;
                }
            }
        }
        return false;
    }

    public unexport = () => this.gpio.unexport();

    private onPress = () => {
        if (this.ready) {
            console.log(`Button #${this.id} pressed`);
        } else {
            console.log(`Button #${this.id} pressed but it's not ready`);
        }

    }
}
