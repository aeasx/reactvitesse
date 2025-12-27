import { Button } from "antd";
import { useState } from "react";

export function Test() {
  const [list, setList] = useState<string[]>([]);
  const handleClick = () => {
    setList(['a1', 'b2', 'c3']);
  }
  return (
    <div>
      <div className="w-[200px] h-[300px] bg-orange-700">
        Test
      </div>
      <h1>Test</h1>
      <p>Test</p>
      <ul>
        {
          list.map((item, index) => (
            <li key={index}>{item}</li>
          ))
        }
      </ul>
      <div>
        <Button onClick={handleClick}>Test</Button>
      </div>
    </div>
  )
}
