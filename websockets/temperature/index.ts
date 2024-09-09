import { exec } from "child_process";

// Function to extract CPU temperature from the sensors output
function extractCPUTemperature(output: string) {
  // Regex to match the coretemp-isa-0000 temperatures
  const regex = /coretemp-isa-0000[\s\S]*?Package id 0:\s+\+(\d+\.\d+)°C/;
  const match = output.match(regex);

  if (match) {
    const temp = match[1];
    return temp;
  } else {
    console.log("CPU temperature information not found.");
    return null;
  }
}

export function getTemperature() {

  // Run the sensors command
  exec("sensors", (err, stdout, stderr) => {
    if (err) {
      console.error(`Error: ${stderr}`);
      return;
    }

    const temperature = extractCPUTemperature(stdout);

    if (temperature) {
      console.log(`CPU Temperature: ${temperature}°C`);
    }
  });
}