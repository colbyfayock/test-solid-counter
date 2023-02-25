import { createSignal, Index } from "solid-js";
import "./Counter.css";

let timeout: any;
const INCREMENT = 10;
const MAX_POWER = 50;

export default function Counter() {
  const [count, setCount] = createSignal(0);

  function handleOnClick() {
    if ( count() >= MAX_POWER ) return;
    setCount(count() + 1);
    clearTimeout(timeout);
    decrease();
  }

  function decrease() {
    timeout = setTimeout(() => {
      if ( count() > 0 && count() % INCREMENT !== 0 ) {
        setCount(count() - 1);
        decrease();
      }
    }, 500);
  }

  return (
    <>
      <span class="bar" data-level={((count() - parseInt(`${count()}`.split('')[1])) / MAX_POWER) * (MAX_POWER / INCREMENT)}>
        <span class="amount" style={{
          width: `${count() / MAX_POWER * 100}%`
        }}></span>
        <Index each={[...Array(MAX_POWER / INCREMENT)]}>
          {(_, index) => <span class="increment" style={{
            left: `${(100 / INCREMENT * ( index + 1 )) * ( 100 / MAX_POWER) }%`
          }} />}
        </Index>
      </span>
      <button class="button" onClick={handleOnClick} disabled={count() >= MAX_POWER}>
        Clicks: {count()}
      </button>
    </>
  );
}
