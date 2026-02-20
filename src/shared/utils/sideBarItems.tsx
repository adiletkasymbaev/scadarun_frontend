
/* icons */
import { AutoTransformerSingleWindingIcon } from "../icons/AutoTransformerSingleWindingIcon";
import { AutoTransformerTwoWindingHorizontalIcon } from "../icons/AutoTransformerTwoWindingHorizontalIcon";
import { AutoTransformerTwoWindingVerticalIcon } from "../icons/AutoTransformerTwoWindingVerticalIcon";
import { TwoWindingTransformerIcon } from "../icons/TwoWindingTransformerIcon";
import { BoosterIcon } from "../icons/BoosterIcon";
import { ThreeWindingTransformerIcon } from "../icons/ThreeWindingTransformerIcon";
import { FourWindingTransformerIcon } from "../icons/FourWindingTransformerIcon";
import { FourWindingTransformerAltIcon } from "../icons/FourWindingTransformerAltIcon";
import { FourWindingTransformerAlt2Icon } from "../icons/FourWindingTransformerAlt2Icon";
import { FiveWindingTransformerIcon } from "../icons/FiveWindingTransformerIcon";
import { FourWindingAutoTransformerIcon } from "../icons/FourWindingAutoTransformerIcon";
import { ArcSuppressionReactorIcon } from "../icons/ArcSuppressionReactorIcon";
import { CapacitorIcon } from "../icons/CapacitorIcon";
import { ChokeCoilIcon } from "../icons/ChokeCoilIcon";
import { CurrentRelayIcon } from "../icons/CurrentRelayIcon";
import { CurrentTransformerIcon } from "../icons/CurrentTransformerIcon";
import { DcMotorIcon } from "../icons/DcMotorIcon";
import { DoubleReactorIcon } from "../icons/DoubleReactorIcon";
import { FuseIcon } from "../icons/FuseIcon";
import { GeneratorIcon } from "../icons/GeneratorIcon";
import { GroundingIcon } from "../icons/GroundingIcon";
import { HalfChassisIcon } from "../icons/HalfChassisIcon";
import { InductionMotorIcon } from "../icons/InductionMotorIcon";
import { MuftaIcon } from "../icons/MuftaIcon";
import { LoadBreakSwitchIcon } from "../icons/LoadBreakSwitchIcon";
import { OnDisconnectorWithGroundingIcon } from "../icons/OnDisconnectorWithGroundingIcon";
import { OnDisconnectorIcon } from "../icons/OnDisconnectorIcon";
import { OnSwitchgearCellWithDisconnectorIcon } from "../icons/OnSwitchgearCellWithDisconnectorIcon";
import { SwitchgearCellWithCircuitBreakerIcon } from "../icons/SwitchgearCellWithCircuitBreakerIcon";
import { ReactorIcon } from "../icons/ReactorIcon";
import { RvpIcon } from "../icons/RvpIcon";
import { SparkGapIcon } from "../icons/SparkGapIcon";
import { SphericalSurgeArresterIcon } from "../icons/SphericalSurgeArresterIcon";
import { SwitchIcon } from "../icons/SwitchIcon";
import { ThreePositionLoadBreakSwitchIcon } from "../icons/ThreePositionLoadBreakSwitchIcon";
import { SynchronousMotorIcon } from "../icons/SynchronousMotorIcon";
import { ZhuchokIcon } from "../icons/ZhuchokIcon";
import { TubularSurgeArresterIcon } from "../icons/TubularSurgeArresterIcon";
import { ValveSurgeArresterIcon } from "../icons/ValveSurgeArresterIcon";
import { Icon32 } from "../components/Icon32";

export type SidebarItem = {
  id: string;
  name: string;
  icon?: React.ReactNode;
  children?: SidebarItem[];
  nodeType?: string;
};

const sidebarItems: SidebarItem[] = [
  {
    id: "buses",
    name: "Шины",
    icon: <div className="w-[20px] h-[3px] my-3.5 mx-1.5 bg-[#EA7474]" />,
    children: [
      {
        id: "bus",
        name: "Шина",
        icon: <div className="w-[20px] h-[3px] my-3.5 mx-1.5 bg-[#EA7474]" />,
        nodeType: "BusNode",
      },
      {
        id: "bus_vert",
        name: "Шина (Верт.)",
        icon: <div className="w-[20px] h-[3px] my-3.5 mx-1.5 bg-[#542ac1]" />,
        nodeType: "BusNodeVertical",
      },
    ],
  },

  {
    id: "power-transformers",
    name: "Силовые трансформаторы",
    icon: <Icon32 icon={<TwoWindingTransformerIcon />} />,
    children: [
      { id: "at1", name: "Однообмоточный АТ", icon: <Icon32 icon={<AutoTransformerSingleWindingIcon />} />, nodeType: "AutoTransformerSingleWindingNode" },
      { id: "at2v", name: "Двухобмоточный АТ (верт.)", icon: <Icon32 icon={<AutoTransformerTwoWindingVerticalIcon />} />, nodeType: "AutoTransformerTwoWindingVerticalNode" },
      { id: "at2h", name: "Двухобмоточный АТ (гор.)", icon: <Icon32 icon={<AutoTransformerTwoWindingHorizontalIcon />} />, nodeType: "AutoTransformerTwoWindingHorizontalNode" },
      { id: "booster", name: "Бустер", icon: <Icon32 icon={<BoosterIcon />} />, nodeType: "BoosterNode" },
      { id: "tw", name: "Двухобмоточный", icon: <Icon32 icon={<TwoWindingTransformerIcon />} />, nodeType: "TwoWindingTransformerNode" },
      { id: "thw", name: "Трёхобмоточный", icon: <Icon32 icon={<ThreeWindingTransformerIcon />} />, nodeType: "ThreeWindingTransformerNode" },
      { id: "fw", name: "Четырёхобмоточный", icon: <Icon32 icon={<FourWindingTransformerIcon />} />, nodeType: "FourWindingTransformerNode" },
      { id: "fw-alt1", name: "Четырёхобмоточный (альт.1)", icon: <Icon32 icon={<FourWindingTransformerAltIcon />} />, nodeType: "FourWindingTransformerAltNode" },
      { id: "fw-alt2", name: "Четырёхобмоточный (альт.2)", icon: <Icon32 icon={<FourWindingTransformerAlt2Icon />} />, nodeType: "FourWindingTransformerAlt2Node" },
      { id: "fw-auto", name: "Четырёхобмоточный АТ", icon: <Icon32 icon={<FourWindingAutoTransformerIcon />} />, nodeType: "FourWindingAutoTransformerNode" },
      { id: "five", name: "Пятиобмоточный", icon: <Icon32 icon={<FiveWindingTransformerIcon />} />, nodeType: "FiveWindingTransformerNode" },
    ],
  },

  {
    id: "switches",
    name: "Выключатели и рубильники",
    icon: <Icon32 icon={<SwitchIcon />} />,
    children: [
      { id: "sw", name: "Выключатель", icon: <Icon32 icon={<SwitchIcon />} />, nodeType: "SwitchNode" },
      { id: "lbs", name: "Выключатель нагрузки", icon: <Icon32 icon={<LoadBreakSwitchIcon />} />, nodeType: "LoadBreakSwitchNode" },
      { id: "lbs3", name: "3-позиционный ВН", icon: <Icon32 icon={<ThreePositionLoadBreakSwitchIcon />} />, nodeType: "ThreePositionLoadBreakSwitchNode" },
      { id: "disc", name: "Разъединитель", icon: <Icon32 icon={<OnDisconnectorIcon />} />, nodeType: "DisconnectorNode" },
      { id: "disc-g", name: "Разъединитель с ЗН", icon: <Icon32 icon={<OnDisconnectorWithGroundingIcon />} />, nodeType: "DisconnectorWithGroundingNode" },
      { id: "cell-disc", name: "Ячейка КРУ с разъединителем", icon: <Icon32 icon={<OnSwitchgearCellWithDisconnectorIcon />} />, nodeType: "SwitchgearCellWithDisconnectorNode" },
      { id: "cell-cb", name: "Ячейка КРУ с выключателем", icon: <Icon32 icon={<SwitchgearCellWithCircuitBreakerIcon />} />, nodeType: "SwitchgearCellWithCircuitBreakerNode" },
    ],
  },

  {
    id: "other",
    name: "Другое",
    icon: <Icon32 icon={<MuftaIcon />} />,
    children: [
      {
        id: "TextNode",
        name: "Текст",
        icon: (
          <div className="w-[32px] h-[32px] rounded-md bg-white/10 border border-white/10 flex items-center justify-center text-[10px]">
            T
          </div>
        ),
        nodeType: "TextNode",
        defaultData: {
          text: "Подпись",
          width: 140,
          height: 48,
          fontSize: 14,
          bgColor: "#4242A0",
          textColor: "#FFFFFF",
          status: "on",
        },
      },
      { id: "dgr", name: "ДГР", icon: <Icon32 icon={<ArcSuppressionReactorIcon />} />, nodeType: "ArcSuppressionReactorNode" },
      { id: "cap", name: "Конденсатор", icon: <Icon32 icon={<CapacitorIcon />} />, nodeType: "CapacitorNode" },
      { id: "choke", name: "Дроссель", icon: <Icon32 icon={<ChokeCoilIcon />} />, nodeType: "ChokeCoilNode" },
      { id: "relay", name: "РТ", icon: <Icon32 icon={<CurrentRelayIcon />} />, nodeType: "CurrentRelayNode" },
      { id: "ct", name: "ТТ", icon: <Icon32 icon={<CurrentTransformerIcon />} />, nodeType: "CurrentTransformerNode" },
      { id: "dc", name: "Двигатель DC", icon: <Icon32 icon={<DcMotorIcon />} />, nodeType: "DcMotorNode" },
      { id: "dbl-reactor", name: "Реактор сдвоенный", icon: <Icon32 icon={<DoubleReactorIcon />} />, nodeType: "DoubleReactorNode" },
      { id: "fuse", name: "Предохранитель", icon: <Icon32 icon={<FuseIcon />} />, nodeType: "FuseNode" },
      { id: "tubular", name: "Разрядник трубчатый", icon: <Icon32 icon={<TubularSurgeArresterIcon />} />, nodeType: "TubularSurgeArresterNode" },
      { id: "valve", name: "Разрядник вентильный", icon: <Icon32 icon={<ValveSurgeArresterIcon />} />, nodeType: "ValveSurgeArresterNode" },
      { id: "gen", name: "Генератор", icon: <Icon32 icon={<GeneratorIcon />} />, nodeType: "GeneratorNode" },
      { id: "ground", name: "Заземление", icon: <Icon32 icon={<GroundingIcon />} />, nodeType: "GroundingNode" },
      { id: "half", name: "Полушасси", icon: <Icon32 icon={<HalfChassisIcon />} />, nodeType: "HalfChassisNode" },
      { id: "im", name: "Двигатель асинхронный", icon: <Icon32 icon={<InductionMotorIcon />} />, nodeType: "InductionMotorNode" },
      { id: "mufta", name: "Муфта", icon: <Icon32 icon={<MuftaIcon />} />, nodeType: "MuftaNode" },
      { id: "reactor", name: "Реактор", icon: <Icon32 icon={<ReactorIcon />} />, nodeType: "ReactorNode" },
      { id: "rvp", name: "РВП", icon: <Icon32 icon={<RvpIcon />} />, nodeType: "RvpNode" },
      { id: "spark", name: "Искровой промежуток", icon: <Icon32 icon={<SparkGapIcon />} />, nodeType: "SparkGapNode" },
      { id: "sphere", name: "Разрядник шаровой", icon: <Icon32 icon={<SphericalSurgeArresterIcon />} />, nodeType: "SphericalSurgeArresterNode" },
      { id: "sync", name: "Двигатель синхронный", icon: <Icon32 icon={<SynchronousMotorIcon />} />, nodeType: "SynchronousMotorNode" },
      { id: "zh", name: "Жучок", icon: <Icon32 icon={<ZhuchokIcon />} />, nodeType: "ZhuchokNode" },
    ],
  },
];

export default sidebarItems;