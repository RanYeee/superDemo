//
//  DrugViewController.m
//  SuperDemo
//
//  Created by Rany on 2017/6/23.
//  Copyright © 2017年 Rany. All rights reserved.
//

#import "DrugViewController.h"
#import "EDrugDynamicCell.h"
@interface DrugViewController ()<UITableViewDelegate,UITableViewDataSource>
{
    EDrugDynamicCell *_dynamicCell;
    
}
@property(nonatomic, strong) UITableView *tableView;
@end

@implementation DrugViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    self.tableView = [[UITableView alloc]initWithFrame:self.view.bounds style:UITableViewStyleGrouped];
    
    [self.view addSubview:self.tableView];
    self.tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    self.tableView.delegate = self;
    self.tableView.dataSource = self;
    
}

-(NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 3;
}

-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return 1;
}

-(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *cellID =@"cellID";
    
    EDrugDynamicCell *cell = [tableView dequeueReusableCellWithIdentifier:cellID];
    
    if (!cell) {
        
        cell = [[EDrugDynamicCell alloc]initWithStyle:UITableViewCellStyleDefault reuseIdentifier:cellID IsShowNorms:1 IsShowUseage:1 IsShowDosage:1 IsShowCount:1];
        
        _dynamicCell = cell;
    }
    
    cell.titleLabel.text = [NSString stringWithFormat:@"第%d行",indexPath.section];
    
    cell.normsLabel.text = @"规格";
    
    return cell;
}

-(CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    return _dynamicCell.cellHeight;
}

@end
