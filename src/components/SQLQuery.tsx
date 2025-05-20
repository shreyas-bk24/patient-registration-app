import React, { useState } from "react";
import {
  Box,
  Typography,
  Textarea,
  Button,
  Table,
  Stack,
} from "@mui/joy";

interface Props {
  runRawSQL: (query: string) => Promise<any[]>;
}

const SQLQueryBox: React.FC<Props> = ({ runRawSQL }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState("");

  const handleRunQuery = async () => {
    try {
      const rows = await runRawSQL(query);
      setResults(rows);
      setError("");
    } catch (err: any) {
      setError(err.message || "Invalid SQL");
      setResults([]);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography level="h4">Raw SQL Query</Typography>
      <Stack spacing={2} sx={{ mt: 2 }}>
        <Textarea
          minRows={4}
          placeholder="Enter SQL (e.g., SELECT * FROM patients;)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleRunQuery} color="primary">
          Run Query
        </Button>
      </Stack>

      {error && (
        <Typography color="danger" sx={{ mt: 2 }}>
          Error: {error}
        </Typography>
      )}

      {results.length > 0 && (
        <Box sx={{ overflowX: "auto", mt: 3 }}>
          <Table>
            <thead>
              <tr>
                {Object.keys(results[0]).map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val, i) => (
                    <td key={i}>{val as string}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default SQLQueryBox;