<!--
## Sync Impact Report
- **Version change**: 0.0.0 → 1.0.0 (MAJOR — initial ratification)
- **Modified principles**: None (first version)
- **Added sections**:
  - Core Principles (10 principles)
  - Code Quality Standards
  - Development Workflow
  - Governance
- **Removed sections**: None
- **Deferred TODOs**: None
-->

# MovieNest Constitution

## Core Principles

### I. Architecture-First Design

Every feature, component, and module MUST follow a clear architectural pattern
before any code is written. The model MUST:

- Identify the appropriate design pattern (MVC, MVVM, component-based, etc.)
  before generating code
- Separate concerns strictly: data layer, business logic, and presentation
  MUST reside in distinct modules or files
- Favor composition over inheritance in all component and module hierarchies
- Define explicit public interfaces (props, APIs, function signatures) before
  implementing internals
- Ensure every module has a single, well-defined responsibility — if a module
  does two things, split it

**Rationale**: Poorly structured code compounds technical debt exponentially.
Enforcing architecture upfront prevents spaghetti code and makes the codebase
navigable and maintainable at any scale.

### II. Production-Grade Code Quality (NON-NEGOTIABLE)

All generated code MUST be production-ready, never prototype-quality. The model
MUST:

- Use meaningful, descriptive variable and function names — no single-letter
  variables except in trivial loop counters (`i`, `j`, `k`)
- Apply consistent formatting and style conventions matching the project's
  existing codebase
- Eliminate all dead code, unused imports, and commented-out blocks before
  delivering
- Avoid magic numbers and hardcoded strings — extract them into named constants
  or configuration
- Use strict typing (TypeScript strict mode, Python type hints, etc.) wherever
  the language supports it
- Never suppress linter warnings or type errors without an explicit inline
  justification comment

**Rationale**: Every line of code is read far more often than it is written.
Production-grade quality from the start eliminates costly cleanup cycles and
builds a codebase the team can trust.

### III. Comprehensive Error Handling & Resilience

The model MUST treat error handling as a first-class concern, not an
afterthought. Every code path MUST:

- Handle all foreseeable failure modes explicitly — network failures, invalid
  input, missing data, permission errors, timeouts
- Provide user-friendly error messages that explain what went wrong and suggest
  corrective action
- Never swallow exceptions silently — every catch block MUST either handle the
  error meaningfully, re-throw, or log with sufficient context
- Implement graceful degradation: when a non-critical feature fails, the
  application MUST continue functioning
- Use structured error types/codes rather than raw string comparisons for
  programmatic error handling
- Validate all external inputs (user input, API responses, file contents) at
  system boundaries

**Rationale**: Unhandled errors are the #1 source of user frustration and
production incidents. Systematic error handling transforms fragile software
into resilient systems.

### IV. Performance-Conscious Implementation

Every implementation decision MUST consider performance impact. The model MUST:

- Avoid unnecessary re-renders, re-computations, and redundant API calls by
  default
- Use appropriate data structures for the operation profile (Maps for lookups,
  Sets for uniqueness, Arrays for ordered iteration)
- Implement pagination, virtualization, or lazy loading for any list or dataset
  that could exceed 50 items
- Debounce or throttle event handlers that fire rapidly (scroll, resize, input)
- Optimize asset loading: lazy-load images, code-split routes, defer
  non-critical scripts
- Never perform blocking operations on the main thread — use Web Workers,
  async/await, or background processing
- Cache expensive computations and API responses with appropriate invalidation
  strategies

**Rationale**: Performance is a feature. Slow applications lose users.
Building performance awareness into every decision prevents the costly
"optimize later" death spiral.

### V. Security by Default

Security MUST be embedded in every layer of the application. The model MUST:

- Sanitize and escape all user-generated content before rendering to prevent
  XSS attacks
- Never expose API keys, secrets, or sensitive configuration in client-side
  code or version control
- Implement proper authentication and authorization checks on every protected
  route and API endpoint
- Use parameterized queries or ORM methods — never concatenate user input into
  queries
- Apply the principle of least privilege: request only the permissions and data
  actually needed
- Set appropriate CORS, CSP, and security headers on all HTTP responses
- Validate and sanitize on the server side even when client-side validation
  exists

**Rationale**: Security vulnerabilities are existential risks. Every input is
hostile until proven safe, and every output must be controlled. Retrofitting
security is orders of magnitude more expensive than building it in.

### VI. Accessibility as a Core Requirement (NON-NEGOTIABLE)

All user-facing interfaces MUST meet WCAG 2.1 AA compliance. The model MUST:

- Use semantic HTML elements (`<button>`, `<nav>`, `<main>`, `<article>`)
  instead of generic divs with click handlers
- Provide `alt` text for all images and `aria-label` for all interactive
  elements that lack visible text
- Ensure full keyboard navigability — every interactive element MUST be
  reachable and operable via keyboard
- Maintain a minimum color contrast ratio of 4.5:1 for normal text and 3:1 for
  large text
- Never convey information through color alone — use icons, patterns, or text
  labels as supplementary indicators
- Implement proper focus management for modals, drawers, and dynamic content
- Test with screen reader semantics in mind: logical heading hierarchy,
  landmark regions, live regions for dynamic updates

**Rationale**: Accessibility is not a feature — it is a civil right.
Inaccessible software excludes users and exposes the project to legal
liability. Building accessible from the start costs near-zero; retrofitting
is extremely expensive.

### VII. User Experience Excellence

Every interaction MUST feel intentional, polished, and delightful. The model
MUST:

- Provide immediate visual feedback for every user action (loading states,
  hover effects, transition animations)
- Implement responsive design that works flawlessly across mobile, tablet, and
  desktop viewports
- Use smooth, purposeful animations (150ms–300ms duration) — never jarring
  instant changes or sluggish transitions
- Design empty states, loading states, and error states for every view — never
  show a blank screen
- Follow platform conventions and established UX patterns — don't reinvent
  navigation, form layouts, or interaction paradigms without strong
  justification
- Ensure touch targets are at least 44×44px on mobile interfaces
- Maintain visual consistency: spacing, typography, color palette, and
  component styling MUST follow the project's design system

**Rationale**: Users judge software by how it feels, not by its code. A
polished UX builds trust, drives adoption, and differentiates the product.
Small details — loading spinners, smooth transitions, clear feedback —
compound into an exceptional experience.

### VIII. Comprehensive Testing Strategy

Code MUST be verifiably correct through automated testing. The model MUST:

- Write unit tests for all pure functions, utilities, and business logic
- Write integration tests for component interactions, API integrations, and
  data flow
- Achieve meaningful coverage of critical paths rather than chasing arbitrary
  percentage targets
- Follow the Arrange-Act-Assert (AAA) pattern for all test cases
- Test edge cases explicitly: empty inputs, boundary values, null/undefined,
  concurrent operations
- Never test implementation details — test observable behavior and public
  interfaces
- Keep tests independent: no shared mutable state between test cases, no
  ordering dependencies

**Rationale**: Tests are the safety net that enables confident refactoring and
rapid iteration. Without tests, every change is a gamble. With tests, the
codebase becomes a living, evolving asset.

### IX. Documentation & Self-Documenting Code

Code MUST be comprehensible without its author present. The model MUST:

- Write self-documenting code that makes intent obvious through naming and
  structure before adding comments
- Document the "why" in comments, not the "what" — the code shows what
  happens; comments explain why it matters
- Include JSDoc/TSDoc/docstring headers for all public functions, classes, and
  modules describing purpose, parameters, return values, and exceptions
- Maintain a current README with setup instructions, architecture overview, and
  contribution guidelines
- Document all non-obvious business rules, workarounds, and known limitations
  inline where they apply
- Use TODO/FIXME/HACK markers with ticket references for temporary solutions

**Rationale**: Code without documentation is a liability. Every hour saved
by skipping documentation costs ten hours of future confusion. Self-documenting
code with strategic commentary is the gold standard.

### X. Simplicity & Pragmatism (The Meta-Principle)

When in doubt, choose the simpler solution. The model MUST:

- Start with the simplest implementation that correctly solves the problem —
  then optimize only when evidence shows it's necessary
- Avoid premature abstraction: do not create abstractions until a pattern
  repeats at least three times (Rule of Three)
- Prefer standard library solutions and well-maintained community packages over
  custom implementations
- Remove any code, dependency, or abstraction that does not serve a current,
  concrete requirement (YAGNI)
- Favor explicit over implicit — clever code is a liability; clear code is an
  asset
- When choosing between two approaches of similar quality, prefer the one that
  is easier to delete

**Rationale**: Complexity is the ultimate enemy of software projects.
Simplicity keeps velocity high, bugs low, and onboarding fast. Every
abstraction has a cost — only pay it when the benefit is proven.

## Code Quality Standards

All code delivered by the model MUST meet these non-negotiable quality gates:

- **Zero linter errors**: Code MUST pass the project's configured linter
  without suppressing rules
- **Zero type errors**: In typed languages, code MUST compile with strict
  type checking enabled
- **Consistent formatting**: Code MUST follow the project's formatter
  configuration (Prettier, Black, gofmt, etc.)
- **No TODO debt**: New TODOs MUST include a tracking reference (issue number
  or clear description of when to resolve)
- **Dependency hygiene**: New dependencies MUST be justified — prefer
  lightweight, well-maintained packages; avoid bundles that add unused
  functionality
- **Git hygiene**: Commits MUST be atomic and descriptive — one logical change
  per commit with a clear conventional commit message

## Development Workflow

The model MUST follow this workflow for every change:

1. **Understand**: Read and comprehend the requirements fully before writing
   any code. Ask clarifying questions when requirements are ambiguous.
2. **Plan**: Outline the technical approach, identify affected files, and
   consider edge cases before implementation.
3. **Implement**: Write production-quality code following all constitution
   principles.
4. **Verify**: Run linters, type checks, and tests. Fix all issues before
   delivery.
5. **Document**: Update relevant documentation, comments, and README sections.
6. **Review**: Self-review the diff for missed edge cases, security issues,
   accessibility gaps, and unnecessary complexity.

## Governance

This constitution is the supreme governing document for all development
activity on the MovieNest project. All code generation, reviews, and
architectural decisions MUST comply with these principles.

- **Supremacy**: Constitution principles override conflicting ad-hoc
  instructions. If a user request conflicts with a principle, the model MUST
  flag the conflict and propose a compliant alternative.
- **Amendments**: Changes to this constitution require explicit documentation
  of the rationale, a version bump following semantic versioning, and approval
  from the project owner.
- **Compliance Review**: Every delivered code change SHOULD be self-audited
  against the applicable principles before submission.
- **Escalation**: When principles conflict with each other (e.g., Simplicity
  vs. Comprehensive Testing), the model MUST document the trade-off and
  recommend the approach that best serves the user's stated goal.

**Version**: 1.0.0 | **Ratified**: 2026-09-18 | **Last Amended**: 2026-09-18
