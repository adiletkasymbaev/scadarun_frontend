import BusNode from "../customNodes/buses/BusNode";
import ArcSuppressionReactorNode from "../customNodes/other/ArcSuppressionReactorNode";
import CapacitorNode from "../customNodes/other/CapacitorNode";
import ChokeCoilNode from "../customNodes/other/ChokeCoilNode";
import CurrentRelayNode from "../customNodes/other/CurrentRelayNode";
import CurrentTransformerNode from "../customNodes/other/CurrentTransformerNode";
import DcMotorNode from "../customNodes/other/DcMotorNode";
import DoubleReactorNode from "../customNodes/other/DoubleReactorNode";
import FuseNode from "../customNodes/other/FuseNode";
import GeneratorNode from "../customNodes/other/GeneratorNode";
import GroundingNode from "../customNodes/other/GroundingNode";
import HalfChassisNode from "../customNodes/other/HalfChassisNode";
import InductionMotorNode from "../customNodes/other/InductionMotorNode";
import LoadBreakSwitchNode from "../customNodes/switches/LoadBreakSwitchNode";
import MuftaNode from "../customNodes/other/MuftaNode";
import AutoTransformerSingleWindingNode from "../customNodes/powerTransformators/AutoTransformerSingleWindingNode";
import AutoTransformerTwoWindingHorizontalNode from "../customNodes/powerTransformators/AutoTransformerTwoWindingHorizontalNode";
import AutoTransformerTwoWindingVerticalNode from "../customNodes/powerTransformators/AutoTransformerTwoWindingVerticalNode";
import BoosterNode from "../customNodes/powerTransformators/BoosterNode";
import FiveWindingTransformerNode from "../customNodes/powerTransformators/FiveWindingTransformerNode";
import FourWindingAutoTransformerNode from "../customNodes/powerTransformators/FourWindingAutoTransformerNode";
import FourWindingTransformerAlt2Node from "../customNodes/powerTransformators/FourWindingTransformerAlt2Node";
import FourWindingTransformerAltNode from "../customNodes/powerTransformators/FourWindingTransformerAltNode";
import FourWindingTransformerNode from "../customNodes/powerTransformators/FourWindingTransformerNode";
import ThreeWindingTransformerNode from "../customNodes/powerTransformators/ThreeWindingTransformerNode";
import TwoWindingTransformerNode from "../customNodes/powerTransformators/TwoWindingTransformerNode";
import DisconnectorNode from "../customNodes/switches/DisconnectorNode";
import DisconnectorWithGroundingNode from "../customNodes/switches/DisconnectorWithGroundingNode";
import SwitchgearCellWithDisconnectorNode from "../customNodes/switches/SwitchgearCellWithDisconnectorNode";
import ReactorNode from "../customNodes/other/ReactorNode";
import RvpNode from "../customNodes/other/RvpNode";
import SparkGapNode from "../customNodes/other/SparkGapNode";
import SphericalSurgeArresterNode from "../customNodes/other/SphericalSurgeArresterNode";
import SwitchgearCellWithCircuitBreakerNode from "../customNodes/switches/SwitchgearCellWithCircuitBreakerNode";
import SwitchNode from "../customNodes/other/SwitchNode";
import ThreePositionLoadBreakSwitchNode from "../customNodes/other/ThreePositionLoadBreakSwitchNode";
import SynchronousMotorNode from "../customNodes/other/SynchronousMotorNode";
import TubularSurgeArresterNode from "../customNodes/other/TubularSurgeArresterNode";
import ValveSurgeArresterNode from "../customNodes/other/ValveSurgeArresterNode";
import ZhuchokNode from "../customNodes/other/ZhuchokNode";
import TextNode from "../customNodes/other/TextNode";
import BusNodeVertical from "../customNodes/buses/BusNodeVertical";
import TriangleNode from "../customNodes/other/TriangleNode";
import DisconnectorVerticalNode from "../customNodes/switches/DisconnectorVerticalNode";
import FuseHorizontalNode from "../customNodes/other/FuseHorizontalNode";
import AdapterNode from "../customNodes/alternates/AdapterNode";
import SubstationNode from "../customNodes/alternates/SubstationNode";
import SubstationBigNode from "../customNodes/alternates/SubstationBigNode";
import IntermediatePoleNode from "../customNodes/alternates/IntermediatePoleNode";
import TPNode from "../customNodes/alternates/TPNode";
import NuclearPowerPlantNode from "../customNodes/alternates/NuclearPowerPlantNode";
import ArrowLineNode from "../customNodes/alternates/ArrowLineNode";
import HalfChassisFullNode from "../customNodes/other/HalfChassisFullNode";
import HalfChassisTopNode from "../customNodes/other/HalfChassisTopNode";
import HalfChassisLeftNode from "../customNodes/other/HalfChassisLeftNode";
import AnchorConductorNode from "../customNodes/alternates/AnchorConductorNode";

export const nodeTypes = {
  AutoTransformerSingleWindingNode,
  AutoTransformerTwoWindingVerticalNode,
  AutoTransformerTwoWindingHorizontalNode,
  BoosterNode,
  TwoWindingTransformerNode,
  ThreeWindingTransformerNode,
  FourWindingTransformerNode,
  FourWindingTransformerAltNode,
  FourWindingTransformerAlt2Node,
  FourWindingAutoTransformerNode,
  FiveWindingTransformerNode,
  BusNode,
  BusNodeVertical,
  ArcSuppressionReactorNode,
  CapacitorNode,
  ChokeCoilNode,
  CurrentRelayNode,
  CurrentTransformerNode,
  DcMotorNode,
  DoubleReactorNode,
  FuseNode,
  GeneratorNode,
  GroundingNode,
  HalfChassisNode,
  InductionMotorNode,
  MuftaNode,
  LoadBreakSwitchNode,
  DisconnectorNode,
  DisconnectorWithGroundingNode,
  SwitchgearCellWithDisconnectorNode,
  ReactorNode,
  RvpNode,
  SparkGapNode,
  SphericalSurgeArresterNode,
  SwitchgearCellWithCircuitBreakerNode,
  SwitchNode,
  ThreePositionLoadBreakSwitchNode,
  SynchronousMotorNode,
  TubularSurgeArresterNode,
  ValveSurgeArresterNode,
  ZhuchokNode,
  TextNode,
  TriangleNode,
  DisconnectorVerticalNode,
  FuseHorizontalNode,
  AdapterNode,
  SubstationNode,
  SubstationBigNode,
  IntermediatePoleNode,
  TPNode,
  NuclearPowerPlantNode,
  ArrowLineNode,
  HalfChassisFullNode,
  HalfChassisTopNode,
  HalfChassisLeftNode,
  AnchorConductorNode
};