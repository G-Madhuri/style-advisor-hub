export interface SizeRange {
  size: string;
  shoulderMinCm: number;
  shoulderMaxCm: number;
  torsoMinCm: number;
  torsoMaxCm: number;
}

// Size chart data (equivalent to your CSV file)
export const sizeChart: SizeRange[] = [
  { size: "XS", shoulderMinCm: 38, shoulderMaxCm: 41, torsoMinCm: 58, torsoMaxCm: 63 },
  { size: "S", shoulderMinCm: 41, shoulderMaxCm: 44, torsoMinCm: 63, torsoMaxCm: 68 },
  { size: "M", shoulderMinCm: 44, shoulderMaxCm: 47, torsoMinCm: 68, torsoMaxCm: 73 },
  { size: "L", shoulderMinCm: 47, shoulderMaxCm: 50, torsoMinCm: 73, torsoMaxCm: 78 },
  { size: "XL", shoulderMinCm: 50, shoulderMaxCm: 53, torsoMinCm: 78, torsoMaxCm: 83 },
  { size: "XXL", shoulderMinCm: 53, shoulderMaxCm: 57, torsoMinCm: 83, torsoMaxCm: 88 }
];

export const estimateSize = (shoulder: number, torso: number, tolerance: number = 4.0): string => {
  console.log(`Input: Shoulder=${shoulder.toFixed(1)} cm, Torso=${torso.toFixed(1)} cm`);
  
  let bestMatch: string | null = null;
  let bestDistance = Infinity;
  const matches: Array<{ size: string; distance: number }> = [];

  for (const row of sizeChart) {
    const shoulderMid = (row.shoulderMinCm + row.shoulderMaxCm) / 2;
    const torsoMid = (row.torsoMinCm + row.torsoMaxCm) / 2;
    
    console.log(`Checking size ${row.size}: Shoulder range [${(row.shoulderMinCm - tolerance).toFixed(1)}, ${(row.shoulderMaxCm + tolerance).toFixed(1)}], Torso range [${(row.torsoMinCm - tolerance).toFixed(1)}, ${(row.torsoMaxCm + tolerance).toFixed(1)}]`);
    
    if (
      shoulder >= row.shoulderMinCm - tolerance && 
      shoulder <= row.shoulderMaxCm + tolerance &&
      torso >= row.torsoMinCm - tolerance && 
      torso <= row.torsoMaxCm + tolerance
    ) {
      const distance = Math.sqrt(
        Math.pow(shoulder - shoulderMid, 2) + 
        Math.pow(torso - torsoMid, 2)
      );
      
      console.log(`Match found for ${row.size}: Distance=${distance.toFixed(1)}`);
      matches.push({ size: row.size, distance });
      
      if (distance < bestDistance) {
        bestDistance = distance;
        bestMatch = row.size;
      }
    }
  }

  if (matches.length === 0) {
    console.log("No sizes matched within tolerance!");
    return "Unknown";
  }

  console.log(`All matches:`, matches);
  console.log(`Best match: ${bestMatch}, Best distance: ${bestDistance.toFixed(1)}`);
  
  return bestMatch || "Unknown";
};