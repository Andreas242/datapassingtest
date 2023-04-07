import { spawn } from 'child_process';

export default async function handler(req:any, res:any) {
  if (req.method !== 'POST') {
    res.status(405).send('Method not allowed');
    return;
  }

  const input = req.body.input;

  try {
    const reversed = await reverseString(input);
    res.status(200).json({ reversed });
  } catch (error:any) {
    console.error('Error:', error.message);
    res.status(500).send('An error occurred while processing the request');
  }
}

function reverseString(input:string) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', ['./pages/api/pythonscript/reverse_string.py']);

    pythonProcess.stdin.write(input);
    pythonProcess.stdin.end();

    let reversed = '';
    pythonProcess.stdout.on('data', (data) => {
      reversed += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      reject(new Error(data.toString()));
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        resolve(reversed.trim());
      } else {
        reject(new Error(`Python process exited with code ${code}`));
      }
    });
  });
}
