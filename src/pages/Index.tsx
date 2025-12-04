import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Rock {
  id: string;
  name: string;
  type: string;
  color: string;
  hardness: string;
  structure: string;
  texture: string;
  description: string;
  composition: string;
}

interface Question {
  id: number;
  text: string;
  options: { label: string; filter: Partial<Rock> }[];
}

const rocks: Rock[] = [
  {
    id: '1',
    name: 'Гранит',
    type: 'магматическая',
    color: 'серый, розовый, красный',
    hardness: 'высокая (6-7)',
    structure: 'массивная',
    texture: 'крупнозернистая',
    description: 'Интрузивная магматическая порода, состоящая из кварца, полевого шпата и слюды',
    composition: 'Кварц 20-40%, Полевой шпат 50-70%, Слюда 5-15%'
  },
  {
    id: '2',
    name: 'Базальт',
    type: 'магматическая',
    color: 'тёмно-серый, чёрный',
    hardness: 'высокая (5-6)',
    structure: 'массивная',
    texture: 'мелкозернистая',
    description: 'Эффузивная магматическая порода вулканического происхождения',
    composition: 'Плагиоклаз 50-70%, Пироксен 20-40%, Оливин 0-10%'
  },
  {
    id: '3',
    name: 'Известняк',
    type: 'осадочная',
    color: 'белый, серый, жёлтый',
    hardness: 'средняя (3)',
    structure: 'слоистая',
    texture: 'мелкозернистая',
    description: 'Осадочная порода, состоящая из карбоната кальция',
    composition: 'Кальцит >50%, Примеси глин, песка'
  },
  {
    id: '4',
    name: 'Песчаник',
    type: 'осадочная',
    color: 'жёлтый, коричневый, красный',
    hardness: 'средняя (4-5)',
    structure: 'слоистая',
    texture: 'среднезернистая',
    description: 'Обломочная осадочная порода из сцементированных песчинок',
    composition: 'Кварц 60-95%, Цемент (глинистый, карбонатный)'
  },
  {
    id: '5',
    name: 'Мрамор',
    type: 'метаморфическая',
    color: 'белый, серый, разноцветный',
    hardness: 'средняя (3-4)',
    structure: 'массивная',
    texture: 'крупнозернистая',
    description: 'Метаморфическая порода, образованная из известняка',
    composition: 'Кальцит или доломит >95%'
  },
  {
    id: '6',
    name: 'Гнейс',
    type: 'метаморфическая',
    color: 'серый, чёрный с полосами',
    hardness: 'высокая (5-6)',
    structure: 'сланцеватая',
    texture: 'крупнозернистая',
    description: 'Метаморфическая порода с полосчатой текстурой',
    composition: 'Кварц, полевой шпат, слюда (как в граните)'
  }
];

const questions: Question[] = [
  {
    id: 1,
    text: 'Какой тип породы вы наблюдаете?',
    options: [
      { label: 'Магматическая (застывшая лава)', filter: { type: 'магматическая' } },
      { label: 'Осадочная (слоистая)', filter: { type: 'осадочная' } },
      { label: 'Метаморфическая (изменённая)', filter: { type: 'метаморфическая' } }
    ]
  },
  {
    id: 2,
    text: 'Какой основной цвет породы?',
    options: [
      { label: 'Светлый (белый, серый, розовый)', filter: {} },
      { label: 'Тёмный (чёрный, тёмно-серый)', filter: {} },
      { label: 'Цветной (жёлтый, красный, коричневый)', filter: {} }
    ]
  },
  {
    id: 3,
    text: 'Какая структура у породы?',
    options: [
      { label: 'Массивная (однородная)', filter: { structure: 'массивная' } },
      { label: 'Слоистая (видны слои)', filter: { structure: 'слоистая' } },
      { label: 'Сланцеватая (полосчатая)', filter: { structure: 'сланцеватая' } }
    ]
  }
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState<Partial<Rock>>({});
  const [activeTab, setActiveTab] = useState<'algorithm' | 'search'>('algorithm');

  const handleAnswer = (filter: Partial<Rock>) => {
    setSelectedFilters({ ...selectedFilters, ...filter });
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const resetAlgorithm = () => {
    setCurrentStep(0);
    setSelectedFilters({});
  };

  const filteredRocks = rocks.filter(rock => {
    const matchesSearch = searchQuery.trim() === '' || 
      rock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rock.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rock.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rock.hardness.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilters = Object.entries(selectedFilters).every(([key, value]) => {
      if (!value) return true;
      return rock[key as keyof Rock] === value;
    });

    return matchesSearch && matchesFilters;
  });

  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="Mountain" size={48} className="text-primary" />
            <h1 className="text-5xl font-bold text-foreground">Петрография</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Интерактивный алгоритм определения горных пород
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'algorithm' | 'search')} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="algorithm" className="flex items-center gap-2">
              <Icon name="GitBranch" size={18} />
              Алгоритм
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Icon name="Search" size={18} />
              Поиск
            </TabsTrigger>
          </TabsList>

          <TabsContent value="algorithm" className="space-y-6 animate-fade-in">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <CardTitle className="text-2xl">
                    Шаг {currentStep + 1} из {questions.length}
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={resetAlgorithm}>
                    <Icon name="RotateCcw" size={16} className="mr-2" />
                    Сбросить
                  </Button>
                </div>
                <Progress value={progress} className="h-2" />
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold mb-6">{questions[currentStep].text}</h3>
                <div className="grid gap-4">
                  {questions[currentStep].options.map((option, idx) => (
                    <Button
                      key={idx}
                      onClick={() => handleAnswer(option.filter)}
                      variant="outline"
                      className="h-auto py-4 px-6 justify-start text-left hover:border-primary hover:bg-primary/5 transition-all"
                    >
                      <Icon name="ChevronRight" size={20} className="mr-3 text-primary" />
                      <span className="text-base">{option.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {Object.keys(selectedFilters).length > 0 && (
              <Card className="shadow-lg animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Filter" size={24} />
                    Выбранные характеристики
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(selectedFilters).map(([key, value]) => (
                      value && (
                        <Badge key={key} variant="secondary" className="text-sm px-3 py-1">
                          {value}
                        </Badge>
                      )
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="search" className="animate-fade-in">
            <Card className="shadow-lg mb-6">
              <CardHeader>
                <CardTitle>Поиск по базе пород</CardTitle>
                <CardDescription>
                  Введите название породы или её характеристики
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Например: гранит, твёрдая, серый..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-base"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {filteredRocks.length === rocks.length ? 'Все породы' : 'Результаты'}
            </h2>
            <Badge variant="outline" className="text-base px-4 py-2">
              {filteredRocks.length} {filteredRocks.length === 1 ? 'порода' : 'пород'}
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredRocks.map((rock, idx) => (
              <Card 
                key={rock.id} 
                className="shadow-lg hover:shadow-xl transition-shadow animate-fade-in hover-scale"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">{rock.name}</CardTitle>
                      <Badge className="mb-3">{rock.type}</Badge>
                    </div>
                    <Icon name="Gem" size={32} className="text-primary" />
                  </div>
                  <CardDescription className="text-base">{rock.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-semibold text-muted-foreground mb-1 flex items-center gap-1">
                        <Icon name="Palette" size={14} />
                        Цвет
                      </div>
                      <p className="text-sm">{rock.color}</p>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-muted-foreground mb-1 flex items-center gap-1">
                        <Icon name="Hammer" size={14} />
                        Твёрдость
                      </div>
                      <p className="text-sm">{rock.hardness}</p>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-muted-foreground mb-1 flex items-center gap-1">
                        <Icon name="Layers" size={14} />
                        Структура
                      </div>
                      <p className="text-sm">{rock.structure}</p>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-muted-foreground mb-1 flex items-center gap-1">
                        <Icon name="Grid3x3" size={14} />
                        Текстура
                      </div>
                      <p className="text-sm">{rock.texture}</p>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                      <Icon name="Atom" size={14} />
                      Состав
                    </div>
                    <p className="text-sm text-muted-foreground">{rock.composition}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredRocks.length === 0 && (
            <Card className="shadow-lg">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Icon name="SearchX" size={64} className="text-muted-foreground mb-4" />
                <p className="text-xl text-muted-foreground text-center">
                  Породы не найдены
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Попробуйте изменить критерии поиска
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
