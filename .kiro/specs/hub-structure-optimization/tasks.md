# Implementation Plan

- [x] 1. Set up core infrastructure and directory structure




  - Create the new directory structure according to the design
  - Implement base models and interfaces for type safety
  - Set up barrel exports for clean imports
  - _Requirements: 1.1, 1.3, 1.4, 5.1, 5.2, 5.3_



- [x] 1.1 Create new directory structure




  - Create `core/`, `shared/`, and `features/` directories under hub
  - Set up subdirectories for services, models, and components
  - Create placeholder index.ts files for barrel exports


  - _Requirements: 1.1, 1.2, 5.1, 5.2_

- [x] 1.2 Implement base models and interfaces

  - Create BaseModel interface with common properties (key, createdAt, updatedAt)


  - Create AuditableModel interface extending BaseModel
  - Implement type-safe interfaces for generic CRUD operations
  - _Requirements: 6.1, 6.2, 3.1_

- [x] 1.3 Set up barrel exports system

  - Create index.ts files in each directory for clean imports
  - Implement consistent export patterns across all modules
  - Test import paths to ensure proper module resolution
  - _Requirements: 1.3, 4.2, 5.3_



- [x] 2. Enhance and migrate core services

  - Refactor HubCrudService to be more generic and type-safe
  - Implement repository pattern for data access abstraction
  - Create error handling service for centralized error management
  - _Requirements: 2.1, 2.2, 6.1, 6.2_

- [x] 2.1 Enhance HubCrudService with generics

  - Add generic type parameters to all CRUD methods
  - Implement proper TypeScript constraints for type safety
  - Add comprehensive error handling and logging
  - Write unit tests for enhanced service functionality


  - _Requirements: 6.1, 6.2, 6.3_

- [x] 2.2 Implement repository pattern

  - Create abstract BaseRepository class with generic CRUD operations
  - Implement concrete repository classes for each domain (Contract, Settings)
  - Add proper dependency injection and service abstraction
  - Write unit tests for repository implementations
  - _Requirements: 6.1, 6.2, 6.3_

- [x] 2.3 Create centralized error handling service

  - Implement ErrorHandlingService with notification integration
  - Create error boundary component for graceful error display
  - Add proper error logging and user feedback mechanisms


  - Write unit tests for error handling scenarios
  - _Requirements: 6.2, 6.3_



- [x] 3. Create shared components infrastructure

  - Extract and refactor FAB component to be truly generic
  - Create reusable UI components following ng-zorro patterns
  - Implement proper component interfaces and contracts
  - _Requirements: 2.1, 2.2, 2.4, 3.1_

- [x] 3.1 Refactor FAB component to shared/components

  - Move fab.component.ts to shared/components/fab directory
  - Remove business-specific logic and make it truly generic
  - Add proper TypeScript interfaces for component inputs/outputs
  - Create comprehensive component documentation and examples
  - _Requirements: 2.1, 2.2, 2.4_

- [x] 3.2 Create additional shared UI components

  - Implement error boundary component for graceful error handling


  - Create loading spinner component with consistent styling
  - Add confirmation dialog component for delete operations
  - Write unit tests for all shared components
  - _Requirements: 2.1, 2.2, 3.1_



- [ ] 4. Migrate contract feature to new structure
  - Move all contract-related files to features/contracts directory
  - Convert components to Angular v20 standalone architecture
  - Implement proper feature routing with lazy loading
  - _Requirements: 1.1, 1.2, 3.1, 3.2, 4.1, 4.3_



- [x] 4.1 Create contract feature directory structure

  - Set up components/, services/, models/ directories under features/contracts
  - Create subdirectories for contract-list, contract-form, contract-payments


  - Set up proper barrel exports for the contract feature
  - _Requirements: 1.1, 1.2, 5.3_

- [ ] 4.2 Implement complete contract management with all existing functionality in single page
  - Preserve all existing inline editing capabilities (contract name, code, fee code, amount)
  - Maintain client dropdown selection with dynamic client list
  - Keep auto-generated contract serial number system (C00001 format)
  - Implement expandable table rows to show payment details and workflow progress inline
  - Preserve complete payment request CRUD operations with status management
  - Maintain file upload functionality with validation (10MB limit, 5 files max, multiple formats)
  - Keep interactive workflow approval system with comment capability
  - Preserve all existing state management (expand states, loading states, submission states)
  - Convert to standalone component with OnPush strategy and Angular v20 signals
  - Ensure FAB button functionality for new contract creation
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 9.1, 9.2, 9.3, 9.4, 10.1, 10.2, 10.3, 10.4, 3.1, 3.2, 3.3_

- [ ] 4.3 Migrate and preserve all contract services and models with complete functionality
  - Move contract.service.ts to features/contracts/services while preserving all methods
  - Preserve getNextContractSerial() method with transaction-based serial number generation
  - Preserve recycleContractSerial() method for serial number recycling
  - Preserve getClientsSettings() and setClientsSettings() methods for dynamic client management
  - Preserve getDefaultClient() method for default client functionality
  - Move contract.model.ts, contract-payment.model.ts, contract-workflow.model.ts to features/contracts/models
  - Preserve ContractPaymentService with all payment CRUD operations and workflow integration
  - Preserve ContractWorkflowService with template management and workflow processing
  - Preserve ContractAttachmentService for file upload functionality
  - Update services to use repository pattern while maintaining all existing functionality
  - Add comprehensive unit tests for all migrated services
  - _Requirements: 6.1, 6.2, 6.3, 9.1, 9.2, 9.3, 9.4, 10.1, 10.2, 10.3, 10.4_

- [x] 4.4 Implement contract feature routing

  - Create routes.ts file for contract feature with lazy loading
  - Set up proper route guards and resolvers if needed
  - Update main hub routes to lazy load contract feature
  - Test routing functionality and lazy loading behavior
  - _Requirements: 4.1, 4.2, 4.3_

- [x] 5. Migrate payment and workflow sub-features

  - Move payment-related components to contract-payments subdirectory
  - Move workflow-related components to contract-workflow subdirectory
  - Implement proper sub-feature organization and routing
  - _Requirements: 7.1, 7.2, 7.3_

- [x] 5.1 Set up payment sub-feature structure


  - Create contract-payments directory under features/contracts/components
  - Move payment-list and payment-form components to new location
  - Update payment service and model organization
  - Implement proper routing for payment sub-features
  - _Requirements: 7.1, 7.2_



- [x] 5.2 Set up workflow sub-feature structure

  - Create contract-workflow directory under features/contracts/components
  - Move workflow-steps and related components to new location
  - Update workflow service and model organization


  - Prepare structure for future workflow designer component
  - _Requirements: 7.2, 7.3, 7.4_

- [x] 6. Preserve and enhance settings feature with flexible owner and workflow management


  - Maintain existing flexible owner management functionality
  - Preserve dynamic workflow template configuration
  - Convert to new structure while keeping all business logic
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 6.1 Create settings feature structure with preserved functionality


  - Set up features/settings directory with proper subdirectories
  - Move settings.component.ts and related files to new location
  - Preserve all existing owner management and workflow template features
  - Set up proper barrel exports for settings feature
  - _Requirements: 7.1, 7.2, 1.1, 1.2_



- [x] 6.2 Convert settings components to standalone while preserving functionality


  - Update SettingsComponent to standalone with OnPush strategy
  - Maintain all existing reactive forms for owner and workflow management
  - Preserve Angular signals for dynamic owner and workflow state management
  - Ensure all existing business logic for flexible configuration is maintained
  - Write comprehensive unit tests for settings components
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 3.1, 3.2, 3.3_

- [x] 6.3 Implement settings feature routing with preserved functionality

  - Create routes.ts for settings feature with lazy loading
  - Update main hub routes to include settings lazy loading
  - Test settings feature routing and component loading
  - Verify all owner management and workflow template features work correctly
  - _Requirements: 4.1, 4.2, 4.3, 7.1, 7.2_

- [x] 7. Migrate workspace feature

  - Move workspace components to features/workspace directory
  - Convert to standalone components and implement proper architecture
  - Set up feature routing with lazy loading
  - _Requirements: 1.1, 1.2, 3.1, 4.1_

- [x] 7.1 Create workspace feature structure

  - Set up features/workspace directory with proper organization


  - Move workspace.component.ts to new location
  - Create workspace service and model structure
  - Set up barrel exports for workspace feature
  - _Requirements: 1.1, 1.2, 2.1_

- [x] 7.2 Convert workspace components to standalone



  - Update WorkspaceComponent to standalone architecture
  - Implement proper component interfaces and typing
  - Add OnPush change detection strategy
  - Write unit tests for workspace components
  - _Requirements: 3.1, 3.2, 3.3_

- [x] 7.3 Implement workspace feature routing

  - Create routes.ts for workspace feature
  - Set up lazy loading configuration
  - Update main hub routes configuration
  - Test workspace feature functionality
  - _Requirements: 4.1, 4.2, 4.3_

- [ ] 8. Update main hub routing configuration
  - Refactor main routes.ts to use lazy loading for all features
  - Remove direct component imports and use loadChildren
  - Test routing performance and lazy loading behavior
  - _Requirements: 4.1, 4.2, 4.3_

- [x] 8.1 Implement lazy loading for all features


  - Update routes.ts to use loadChildren for contracts, settings, workspace
  - Remove direct component imports from main routes file
  - Configure proper route preloading strategies
  - _Requirements: 4.1, 4.2, 4.3_

- [ ] 8.2 Test routing and lazy loading functionality
  - Verify that each feature loads independently
  - Test route navigation and component rendering
  - Validate bundle splitting and performance improvements
  - Check browser developer tools for proper chunk loading
  - _Requirements: 4.1, 4.3_

- [ ] 9. Implement comprehensive testing
  - Write unit tests for all migrated components and services
  - Create integration tests for feature modules
  - Add performance tests for lazy loading
  - _Requirements: 6.3_

- [ ] 9.1 Write unit tests for core services
  - Test enhanced HubCrudService with various data types
  - Test repository pattern implementations
  - Test error handling service functionality
  - Achieve minimum 80% code coverage for core services
  - _Requirements: 6.3_

- [ ] 9.2 Write unit tests for feature components
  - Test all contract feature components (list, form, payments)
  - Test settings and workspace components
  - Test shared components (FAB, error boundary)



  - Mock dependencies properly and test component behavior
  - _Requirements: 6.3_

- [ ] 9.3 Create integration tests for features
  - Test complete user workflows for contract management
  - Test feature routing and lazy loading integration
  - Test cross-feature communication and shared services
  - Validate error handling across feature boundaries
  - _Requirements: 6.3_

- [ ] 10. Performance optimization and validation
  - Validate bundle size improvements from lazy loading
  - Test application performance with new architecture
  - Optimize change detection and memory usage
  - _Requirements: 4.1, 4.3_

- [ ] 10.1 Validate lazy loading performance
  - Measure initial bundle size reduction
  - Test feature loading times and user experience
  - Validate proper tree-shaking with new structure
  - Document performance improvements achieved
  - _Requirements: 4.1, 4.3_

- [ ] 10.2 Optimize change detection strategy
  - Ensure all components use OnPush where appropriate
  - Implement Angular v20 signals for reactive state management
  - Optimize subscription management and memory usage
  - Test application responsiveness under load
  - _Requirements: 3.2, 3.3_

- [ ] 11. Documentation and cleanup
  - Update project documentation to reflect new structure
  - Create developer guide for new architecture patterns
  - Clean up old files and update import statements
  - _Requirements: 5.4_

- [ ] 11.1 Update project documentation
  - Document new directory structure and organization principles
  - Create developer guide for adding new features
  - Update README with new architecture information
  - Document migration process for future reference
  - _Requirements: 5.4_

- [ ] 11.2 Clean up legacy code and files
  - Remove old directory structure and unused files
  - Update all import statements throughout the application
  - Verify no broken imports or missing dependencies
  - Run full application test suite to ensure stability
  - _Requirements: 5.4_