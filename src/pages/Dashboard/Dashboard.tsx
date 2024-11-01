import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [htmlContent, setHtmlContent] = useState("");

  const getDash = async () => {
    try {
      const res = await axios.get(`http://45.169.29.120:8000/generate-dashboard/5/percent`);
      setHtmlContent(res.data); 
      console.log(res.data)
    } catch (error) {
      console.error("Erro ao buscar o dashboard:", error);
    }
  };

  useEffect(() => {
    getDash(); // Chama a API ao montar o componente
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <iframe 
      srcDoc={htmlContent}
      title="Dashboard"
      style={{ width: '100%', height: '600px', border: 'none' }}
    />
    </div>
  );
}
