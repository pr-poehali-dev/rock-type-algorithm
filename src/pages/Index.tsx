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
  { id: '1', name: 'Гранит', type: 'магматическая', color: 'серый, розовый, красный', hardness: 'высокая (6-7)', structure: 'массивная', texture: 'крупнозернистая', description: 'Интрузивная магматическая порода с зернистой структурой', composition: 'Кварц 20-40%, Полевой шпат 50-70%, Слюда 5-15%' },
  { id: '2', name: 'Сиенит', type: 'магматическая', color: 'серый, розовый', hardness: 'высокая (6)', structure: 'массивная', texture: 'крупнозернистая', description: 'Интрузивная порода, похожа на гранит, но без кварца', composition: 'Полевой шпат 60-90%, Роговая обманка, Биотит' },
  { id: '3', name: 'Диорит', type: 'магматическая', color: 'серый, зеленовато-серый', hardness: 'высокая (5-6)', structure: 'массивная', texture: 'среднезернистая', description: 'Интрузивная порода промежуточного состава', composition: 'Плагиоклаз 60-75%, Амфибол, Биотит' },
  { id: '4', name: 'Габбро', type: 'магматическая', color: 'тёмно-серый, чёрный, зелёный', hardness: 'высокая (6-7)', structure: 'массивная', texture: 'крупнозернистая', description: 'Интрузивная основная порода, глубинный аналог базальта', composition: 'Плагиоклаз 40-60%, Пироксен 30-50%, Оливин' },
  { id: '5', name: 'Липарит', type: 'магматическая', color: 'светло-серый, розовый, жёлтый', hardness: 'высокая (6)', structure: 'массивная', texture: 'мелкозернистая', description: 'Эффузивный аналог гранита, кислая вулканическая порода', composition: 'Кварц, Полевой шпат, Стекловатая масса' },
  { id: '6', name: 'Трахит', type: 'магматическая', color: 'серый, желтоватый', hardness: 'высокая (5-6)', structure: 'массивная', texture: 'мелкозернистая', description: 'Эффузивный аналог сиенита, щелочная вулканическая порода', composition: 'Санидин 70-80%, Плагиоклаз, Биотит' },
  { id: '7', name: 'Андезит', type: 'магматическая', color: 'серый, зеленовато-серый', hardness: 'высокая (5-6)', structure: 'массивная', texture: 'мелкозернистая', description: 'Эффузивный аналог диорита, средняя вулканическая порода', composition: 'Плагиоклаз 50-70%, Амфибол, Пироксен' },
  { id: '8', name: 'Базальт', type: 'магматическая', color: 'тёмно-серый, чёрный', hardness: 'высокая (5-6)', structure: 'массивная', texture: 'мелкозернистая', description: 'Эффузивная основная порода, самая распространённая вулканическая', composition: 'Плагиоклаз 50-70%, Пироксен 20-40%, Оливин' },
  { id: '9', name: 'Диабаз', type: 'магматическая', color: 'тёмно-серый, зеленовато-чёрный', hardness: 'высокая (6)', structure: 'массивная', texture: 'среднезернистая', description: 'Полукристаллическая магматическая порода, измененный базальт', composition: 'Плагиоклаз, Пироксен, Хлорит' },
  { id: '10', name: 'Порфирит', type: 'магматическая', color: 'серый, бурый, зеленоватый', hardness: 'высокая (5-6)', structure: 'порфировая', texture: 'мелкозернистая с вкрапленниками', description: 'Эффузивная порода с порфировой структурой', composition: 'Плагиоклаз, Пироксен, Основная масса' },
  { id: '11', name: 'Полевошпатовый порфирит', type: 'магматическая', color: 'серый, красноватый', hardness: 'высокая (5-6)', structure: 'порфировая', texture: 'мелкозернистая с вкрапленниками полевого шпата', description: 'Порфировая порода с крупными кристаллами полевого шпата', composition: 'Полевой шпат (вкрапленники), Кварц, Основная масса' },
  { id: '12', name: 'Пегматит', type: 'магматическая', color: 'белый, розовый, пёстрый', hardness: 'высокая (6-7)', structure: 'массивная', texture: 'грубозернистая', description: 'Крупнокристаллическая порода с гигантскими кристаллами', composition: 'Кварц, Полевой шпат, Слюда (крупные кристаллы)' },
  { id: '13', name: 'Вулканическое стекло', type: 'магматическая', color: 'чёрный, коричневый, серый', hardness: 'высокая (5-6)', structure: 'аморфная', texture: 'стекловатая', description: 'Быстро застывшая лава без кристаллической структуры (обсидиан)', composition: 'Аморфное вулканическое стекло (70-75% SiO2)' },
  { id: '14', name: 'Вулканический туф', type: 'магматическая', color: 'серый, жёлтый, красный', hardness: 'низкая (2-3)', structure: 'пористая', texture: 'обломочная', description: 'Порода из спрессованного вулканического пепла', composition: 'Вулканический пепел, Обломки лавы, Пемза' },
  { id: '15', name: 'Пемза', type: 'магматическая', color: 'белый, серый, жёлтый', hardness: 'низкая (2-3)', structure: 'пористая', texture: 'пенистая', description: 'Лёгкая пористая вулканическая порода, плавает в воде', composition: 'Вулканическое стекло с газовыми пузырьками' },
  { id: '16', name: 'Мрамор', type: 'метаморфическая', color: 'белый, серый, разноцветный', hardness: 'средняя (3-4)', structure: 'массивная', texture: 'кристаллическая', description: 'Метаморфизованный известняк с кристаллической структурой', composition: 'Кальцит или доломит >95%' },
  { id: '17', name: 'Глинистый сланец', type: 'метаморфическая', color: 'серый, чёрный, красный', hardness: 'низкая (2-3)', structure: 'сланцеватая', texture: 'тонкослоистая', description: 'Метаморфизованная глина с совершенной сланцеватостью', composition: 'Глинистые минералы, Кварц, Слюда' },
  { id: '18', name: 'Слюдистый сланец', type: 'метаморфическая', color: 'серый, серебристый, зелёный', hardness: 'средняя (3-4)', structure: 'сланцеватая', texture: 'листоватая', description: 'Сланец с большим содержанием слюды, с блеском', composition: 'Слюда (мусковит, биотит) 30-50%, Кварц' },
  { id: '19', name: 'Кварцит', type: 'метаморфическая', color: 'белый, серый, розовый', hardness: 'очень высокая (7)', structure: 'массивная', texture: 'кристаллическая', description: 'Метаморфизованный песчаник, почти чистый кварц', composition: 'Кварц >90%' },
  { id: '20', name: 'Тальковый сланец', type: 'метаморфическая', color: 'серый, зеленоватый, белый', hardness: 'очень низкая (1)', structure: 'сланцеватая', texture: 'жирная на ощупь', description: 'Мягкий сланец с высоким содержанием талька', composition: 'Тальк >50%, Хлорит, Карбонаты' },
  { id: '21', name: 'Гнейс', type: 'метаморфическая', color: 'серый, чёрный с полосами', hardness: 'высокая (5-6)', structure: 'сланцеватая', texture: 'полосчатая', description: 'Метаморфизованный гранит с полосчатой текстурой', composition: 'Кварц, Полевой шпат, Слюда (полосами)' },
  { id: '22', name: 'Брекчия', type: 'осадочная', color: 'пёстрый, зависит от обломков', hardness: 'средняя (3-5)', structure: 'обломочная', texture: 'грубая', description: 'Порода из угловатых обломков, сцементированных', composition: 'Угловатые обломки различных пород + цемент' },
  { id: '23', name: 'Конгломерат', type: 'осадочная', color: 'пёстрый, зависит от гальки', hardness: 'средняя (3-5)', structure: 'обломочная', texture: 'грубая', description: 'Порода из округлых галек, сцементированных', composition: 'Окатанная галька различных пород + цемент' },
  { id: '24', name: 'Гравелит', type: 'осадочная', color: 'серый, жёлтый, коричневый', hardness: 'средняя (4)', structure: 'обломочная', texture: 'крупнозернистая', description: 'Порода из гравия (2-10 мм), сцементированного', composition: 'Зёрна гравия (кварц, полевой шпат) + цемент' },
  { id: '25', name: 'Песчаник', type: 'осадочная', color: 'жёлтый, коричневый, красный, серый', hardness: 'средняя (4-5)', structure: 'обломочная', texture: 'среднезернистая', description: 'Обломочная порода из песчинок (0.1-2 мм)', composition: 'Кварц 60-95% + Цемент (глинистый, карбонатный)' },
  { id: '26', name: 'Алевролит', type: 'осадочная', color: 'серый, коричневый', hardness: 'низкая (2-3)', structure: 'обломочная', texture: 'мелкозернистая', description: 'Порода из алеврита (0.01-0.1 мм), между песком и глиной', composition: 'Алевритовые частицы (кварц, глина) + цемент' },
  { id: '27', name: 'Глина', type: 'осадочная', color: 'серый, красный, жёлтый, белый', hardness: 'очень низкая (1-2)', structure: 'рыхлая', texture: 'тонкозернистая', description: 'Рыхлая порода из глинистых минералов, пластична во влажном состоянии', composition: 'Глинистые минералы (каолинит, монтмориллонит) >50%' },
  { id: '28', name: 'Аргиллит', type: 'осадочная', color: 'серый, чёрный, коричневый', hardness: 'низкая (2-3)', structure: 'плотная', texture: 'тонкозернистая', description: 'Уплотнённая глина, не размокает в воде', composition: 'Глинистые минералы, Кварц (уплотнённые)' },
  { id: '29', name: 'Известняк органогенный', type: 'осадочная', color: 'белый, серый, жёлтый', hardness: 'средняя (3)', structure: 'органогенная', texture: 'зернистая', description: 'Известняк из раковин и скелетов организмов', composition: 'Кальцит >50% (раковины, кораллы, скелеты)' },
  { id: '30', name: 'Мел', type: 'осадочная', color: 'белый, светло-серый', hardness: 'очень низкая (1-2)', structure: 'рыхлая', texture: 'мягкая', description: 'Мягкая белая порода из остатков микроорганизмов', composition: 'Кальцит (микроскопические раковины) >95%' },
  { id: '31', name: 'Травертин', type: 'осадочная', color: 'белый, жёлтый, коричневый', hardness: 'средняя (3-4)', structure: 'пористая', texture: 'ячеистая', description: 'Известковый туф, образованный из источников', composition: 'Кальцит >90% (осаждённый из воды)' },
  { id: '32', name: 'Известняк хемогенный', type: 'осадочная', color: 'белый, серый', hardness: 'средняя (3)', structure: 'плотная', texture: 'кристаллическая', description: 'Известняк, осаждённый химическим путём', composition: 'Кальцит >90% (химическое осаждение)' },
  { id: '33', name: 'Кремень', type: 'осадочная', color: 'серый, чёрный, коричневый', hardness: 'очень высокая (7)', structure: 'плотная', texture: 'скрытокристаллическая', description: 'Плотная кремнистая порода с раковистым изломом', composition: 'Аморфный кремнезём SiO2 >95%' },
  { id: '34', name: 'Диатомит', type: 'осадочная', color: 'белый, светло-серый, желтоватый', hardness: 'очень низкая (1-2)', structure: 'рыхлая', texture: 'пористая', description: 'Лёгкая пористая порода из панцирей диатомей', composition: 'Опал (панцири диатомей) >50%' },
  { id: '35', name: 'Ангидрит', type: 'осадочная', color: 'белый, серый, голубоватый', hardness: 'средняя (3-4)', structure: 'массивная', texture: 'кристаллическая', description: 'Безводный сульфат кальция, химический осадок', composition: 'CaSO4 >95%' },
  { id: '36', name: 'Сильвин', type: 'осадочная', color: 'белый, красный, синий', hardness: 'низкая (2)', structure: 'кристаллическая', texture: 'зернистая', description: 'Хлорид калия, соляная порода, солёный вкус', composition: 'KCl >95%' },
  { id: '37', name: 'Каменная соль', type: 'осадочная', color: 'белый, бесцветный, розовый', hardness: 'низкая (2-2.5)', structure: 'кристаллическая', texture: 'зернистая', description: 'Хлорид натрия (галит), соляная порода', composition: 'NaCl >95%' },
  { id: '38', name: 'Доломит', type: 'осадочная', color: 'белый, серый, желтоватый', hardness: 'средняя (3.5-4)', structure: 'массивная', texture: 'кристаллическая', description: 'Карбонатная порода из минерала доломита', composition: 'CaMg(CO3)2 >50%' },
  { id: '39', name: 'Мергель', type: 'осадочная', color: 'серый, желтоватый', hardness: 'низкая (2-3)', structure: 'массивная', texture: 'землистая', description: 'Смешанная порода между известняком и глиной', composition: 'Карбонаты 30-70%, Глинистые минералы 30-70%' }
];

const questions: Question[] = [
  {
    id: 1,
    text: 'Какой тип породы вы наблюдаете?',
    options: [
      { label: 'Магматическая (застывшая лава, вулканы)', filter: { type: 'магматическая' } },
      { label: 'Осадочная (слои, обломки, соли)', filter: { type: 'осадочная' } },
      { label: 'Метаморфическая (изменённая, сланцеватая)', filter: { type: 'метаморфическая' } }
    ]
  },
  {
    id: 2,
    text: 'Какая текстура у породы?',
    options: [
      { label: 'Крупнозернистая (видны крупные зёрна)', filter: { texture: 'крупнозернистая' } },
      { label: 'Среднезернистая (средние зёрна)', filter: { texture: 'среднезернистая' } },
      { label: 'Мелкозернистая (мелкие зёрна)', filter: { texture: 'мелкозернистая' } },
      { label: 'Стекловатая или пористая', filter: {} },
      { label: 'Обломочная или рыхлая', filter: {} }
    ]
  },
  {
    id: 3,
    text: 'Какая структура у породы?',
    options: [
      { label: 'Массивная (однородная, плотная)', filter: { structure: 'массивная' } },
      { label: 'Сланцеватая / полосчатая', filter: { structure: 'сланцеватая' } },
      { label: 'Обломочная (видны обломки)', filter: { structure: 'обломочная' } },
      { label: 'Пористая / ячеистая', filter: { structure: 'пористая' } },
      { label: 'Рыхлая (не сцементирована)', filter: { structure: 'рыхлая' } }
    ]
  },
  {
    id: 4,
    text: 'Какая твёрдость породы?',
    options: [
      { label: 'Очень низкая (царапается ногтем)', filter: {} },
      { label: 'Низкая (царапается ножом)', filter: {} },
      { label: 'Средняя (царапает стекло)', filter: {} },
      { label: 'Высокая или очень высокая', filter: {} }
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