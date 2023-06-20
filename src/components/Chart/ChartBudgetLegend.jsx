import React from 'react'

function ChartBudgetLegend({ legends}) {



// legends.map((legend,i)=>{
//   console.log(colors[i]);
// })
  return (
    <div className="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400">
      {legends?.yearlyBudgets?.map((legend,i) => (
        <div className="flex items-center" key={legend.year?.slice(0,4)}>
            <span style={{backgroundColor:legend.color}} className={`inline-block w-3 h-3 mr-1 rounded-full`}></span>
          <span>{legend.year?.slice(0,4)}</span>
        </div>
      ))}
    </div>
  )
}

export default ChartBudgetLegend
