'use client'
import React, { useState } from 'react';
import { CheckCircle, XCircle, Star, Shield, Clock, Heart, Zap, Trophy } from 'lucide-react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Il resto del codice dell'artifact va qui */}
    </div>
  );
}