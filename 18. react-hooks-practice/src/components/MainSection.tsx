export const MainSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto space-y-8'>{children}</div>
    </div>
  );
};
