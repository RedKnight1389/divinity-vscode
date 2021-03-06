import Symbol from "../../../projects/story/Symbol";
import { ArgumentNode } from "../utils/isArgumentNode";
import { ActionNode } from "../utils/isActionNode";
import { ConditionNode } from "../utils/isConditionNode";
import { TokenRange } from "../Lexer";

export const enum NodeType {
  ActionBlock,
  ConditionBlock,
  Definition,
  Div,
  DivGoal,
  GoalCompletedAction,
  GuidLiteral,
  Identifier,
  IntegerLiteral,
  OperatorCondition,
  Parameter,
  ParentTragetEdge,
  RealLiteral,
  Rule,
  RuleBlock,
  Signature,
  SignatureAction,
  SignatureCondition,
  StoryGoal,
  StringLiteral,
  TypeAnnotation
}

export const enum ParameterFlow {
  In = 1,
  Out = 2
}

export const enum IdentifierType {
  Default,
  Database,
  Empty,
  Variable
}

export interface Region extends TokenRange {
  name: string;
}

export type AnyNode =
  | ActionBlockNode
  | ConditionBlockNode
  | DefinitionNode
  | HeaderNode
  | HeaderGoalNode
  | GoalCompletedNode
  | GuidLiteralNode
  | IdentifierNode
  | NumericLiteralNode
  | OperatorNode
  | ParameterNode
  | ParentTargetEdgeNode
  | RuleBlockNode
  | RuleNode
  | SignatureCallNode
  | SignatureNode
  | StoryGoalNode
  | StringLiteralNode
  | TypeAnnotationNode;

export interface AbstractNode extends TokenRange {
  type: NodeType;
}

export interface AbstractGoalNode extends AbstractNode {
  exit: ActionBlockNode | null;
  init: ActionBlockNode | null;
  kb: RuleBlockNode | null;
}

export interface ActionBlockNode extends AbstractNode {
  actions: Array<ActionNode>;
  type: NodeType.ActionBlock;
}

export interface ConditionBlockNode extends AbstractNode {
  conditions: Array<ConditionNode>;
  type: NodeType.ConditionBlock;
}

export interface HeaderNode extends AbstractNode {
  definitions: Array<DefinitionNode>;
  goals: Array<HeaderGoalNode>;
  type: NodeType.Div;
  typeAliases: Array<string>;
}

export interface HeaderGoalNode extends AbstractNode {
  exit: string | null;
  id: number;
  init: string | null;
  kb: string | null;
  subGoal: Array<number>;
  title: string | null;
  type: NodeType.DivGoal;
}

export interface DefinitionNode extends AbstractNode {
  definitionType: string;
  signature: SignatureNode;
  type: NodeType.Definition;
}

export interface GoalCompletedNode extends AbstractNode {
  type: NodeType.GoalCompletedAction;
}

export interface GuidLiteralNode extends AbstractNode {
  guid: string;
  prefix: string;
  type: NodeType.GuidLiteral;
}

export interface IdentifierNode extends AbstractNode {
  identifierType: IdentifierType;
  name: string;
  type: NodeType.Identifier;
}

export interface NumericLiteralNode extends AbstractNode {
  type: NodeType.IntegerLiteral | NodeType.RealLiteral;
  value: number;
}

export interface OperatorNode extends AbstractNode {
  isInverted: boolean;
  leftOperant: ArgumentNode;
  leftType: TypeAnnotationNode | null;
  operator: string;
  rightOperant: ArgumentNode;
  rightType: TypeAnnotationNode | null;
  type: NodeType.OperatorCondition;
}

export interface ParameterNode extends AbstractNode {
  argument: ArgumentNode;
  flow: ParameterFlow | null;
  type: NodeType.Parameter;
  valueType: TypeAnnotationNode | null;
}

export interface ParentTargetEdgeNode extends AbstractNode {
  name: StringLiteralNode;
  type: NodeType.ParentTragetEdge;
}

export interface RuleNode extends AbstractNode {
  body: ActionBlockNode | null;
  comment: string | null;
  conditions: ConditionBlockNode | null;
  region: Region | null;
  ruleType: "IF" | "PROC" | "QRY";
  signature: SignatureNode;
  symbol: Symbol | null;
  type: NodeType.Rule;
}

export interface RuleBlockNode extends AbstractNode {
  rules: Array<RuleNode>;
  type: NodeType.RuleBlock;
}

export interface SignatureCallNode extends AbstractNode {
  isInverted: boolean;
  signature: SignatureNode;
  symbol: Symbol | null;
  type: NodeType.SignatureAction | NodeType.SignatureCondition;
}

export interface SignatureNode extends AbstractNode {
  identifier: IdentifierNode;
  parameters: Array<ParameterNode>;
  type: NodeType.Signature;
}

export interface StoryGoalNode extends AbstractGoalNode {
  parentTargetEdges: Array<ParentTargetEdgeNode>;
  subGoalCombiner: string | null;
  type: NodeType.StoryGoal;
  version: number | null;
}

export interface StringLiteralNode extends AbstractNode {
  type: NodeType.StringLiteral;
  value: string;
}

export interface TypeAnnotationNode extends AbstractNode {
  annotatedType: string | null;
  type: NodeType.TypeAnnotation;
}
