import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Palette, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ColorAnalysis = () => {
  const [features, setFeatures] = useState({
    skinTone: "",
    eyeColor: "",
    hairColor: "",
    undertone: ""
  });
  const [colorPalette, setColorPalette] = useState<string[]>([]);
  const [season, setSeason] = useState("");
  const [showResult, setShowResult] = useState(false);
  const { toast } = useToast();

  const colorPalettes = {
    spring: ["#FF6B6B", "#4ECDC4", "#FFE66D", "#FF8E53", "#95E1D3", "#F38BA8"],
    summer: ["#A8DADC", "#457B9D", "#1D3557", "#F1FAEE", "#E63946", "#2A9D8F"],
    autumn: ["#D2691E", "#8B4513", "#CD853F", "#DEB887", "#B22222", "#228B22"],
    winter: ["#000000", "#FFFFFF", "#8B0000", "#000080", "#800080", "#008B8B"]
  };

  const handleAnalyze = () => {
    if (!features.skinTone || !features.eyeColor || !features.hairColor) {
      toast({
        title: "Missing Information",
        description: "Please select all features to get your color analysis.",
        variant: "destructive",
      });
      return;
    }

    // Simple color analysis logic (in a real app, this would use more sophisticated analysis)
    let determinedSeason = "summer";
    
    if (features.skinTone === "fair" && features.hairColor === "blonde") {
      determinedSeason = "spring";
    } else if (features.skinTone === "medium" && (features.hairColor === "brown" || features.hairColor === "auburn")) {
      determinedSeason = "autumn";
    } else if (features.skinTone === "deep" || features.eyeColor === "dark-brown") {
      determinedSeason = "winter";
    }

    setSeason(determinedSeason);
    setColorPalette(colorPalettes[determinedSeason as keyof typeof colorPalettes]);
    setShowResult(true);
    
    toast({
      title: "Analysis Complete!",
      description: `You're a ${determinedSeason.charAt(0).toUpperCase() + determinedSeason.slice(1)}! Check out your perfect colors.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Palette className="w-6 h-6 text-accent" />
              <h1 className="text-2xl font-bold text-foreground">Personal Color Analysis</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          
          {!showResult ? (
            <Card className="shadow-card">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">Discover Your Perfect Colors</CardTitle>
                <CardDescription className="text-lg">
                  Tell us about your natural features to find your ideal color palette
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Skin Tone</Label>
                  <Select value={features.skinTone} onValueChange={(value) => setFeatures({...features, skinTone: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your skin tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fair">Fair/Light</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="deep">Deep/Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Eye Color</Label>
                  <Select value={features.eyeColor} onValueChange={(value) => setFeatures({...features, eyeColor: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your eye color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="hazel">Hazel</SelectItem>
                      <SelectItem value="brown">Brown</SelectItem>
                      <SelectItem value="dark-brown">Dark Brown</SelectItem>
                      <SelectItem value="gray">Gray</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Hair Color</Label>
                  <Select value={features.hairColor} onValueChange={(value) => setFeatures({...features, hairColor: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your hair color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blonde">Blonde</SelectItem>
                      <SelectItem value="brown">Brown</SelectItem>
                      <SelectItem value="auburn">Auburn/Red</SelectItem>
                      <SelectItem value="black">Black</SelectItem>
                      <SelectItem value="gray">Gray/Silver</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Skin Undertone (Optional)</Label>
                  <Select value={features.undertone} onValueChange={(value) => setFeatures({...features, undertone: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="If you know your undertone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="warm">Warm (Yellow/Golden)</SelectItem>
                      <SelectItem value="cool">Cool (Pink/Blue)</SelectItem>
                      <SelectItem value="neutral">Neutral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleAnalyze} 
                  size="lg" 
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Analyze My Colors
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-luxury border-accent/20">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Sparkles className="w-16 h-16 text-accent" />
                </div>
                <CardTitle className="text-4xl font-bold text-accent capitalize">
                  You're a {season}!
                </CardTitle>
                <CardDescription className="text-lg">
                  Here are your perfect colors that will make you glow
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="bg-accent/10 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4 text-center">Your Color Palette</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {colorPalette.map((color, index) => (
                      <div 
                        key={index}
                        className="aspect-square rounded-lg border-2 border-white shadow-md"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3 text-left bg-muted/50 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground">Style Tips for {season.charAt(0).toUpperCase() + season.slice(1)}s:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {season === "spring" && (
                      <>
                        <li>• Wear warm, clear colors that echo nature's renewal</li>
                        <li>• Coral, peach, and warm pinks are your best friends</li>
                        <li>• Avoid heavy, dark colors that can overwhelm you</li>
                      </>
                    )}
                    {season === "summer" && (
                      <>
                        <li>• Cool, soft colors complement your gentle coloring</li>
                        <li>• Pastels and muted tones enhance your natural beauty</li>
                        <li>• Avoid warm, intense colors that can clash</li>
                      </>
                    )}
                    {season === "autumn" && (
                      <>
                        <li>• Rich, warm earth tones are your signature</li>
                        <li>• Deep oranges, warm browns, and golden hues suit you</li>
                        <li>• Avoid cool, icy colors that can make you look washed out</li>
                      </>
                    )}
                    {season === "winter" && (
                      <>
                        <li>• Bold, dramatic colors match your striking features</li>
                        <li>• True colors like pure white and black are perfect</li>
                        <li>• Avoid muted, warm colors that can dull your impact</li>
                      </>
                    )}
                  </ul>
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={() => setShowResult(false)} 
                    variant="outline" 
                    size="lg" 
                    className="flex-1"
                  >
                    Analyze Again
                  </Button>
                  <Link to="/" className="flex-1">
                    <Button size="lg" className="w-full bg-accent hover:bg-accent/90">
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
};

export default ColorAnalysis;