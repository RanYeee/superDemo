//
//  RootViewController.m
//  SuperDemo
//
//  Created by IMac on 16/4/8.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "RootViewController.h"

@interface RootViewController ()<UITableViewDelegate,UITableViewDataSource>

@property (strong,nonatomic) UITableView *tableView;

@property (copy,nonatomic) NSMutableArray *controllerArr;

@end

@implementation RootViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.title = @"Super Demo";
    
    NSString *plistPath = [[NSBundle mainBundle] pathForResource:@"ControllerList" ofType:@"plist"];
    
    _controllerArr = [[NSMutableArray alloc]initWithContentsOfFile:plistPath];
    
    self.tableView = [[UITableView alloc]initWithFrame:self.view.bounds style:UITableViewStyleGrouped];
    
    self.tableView.delegate = self;
    
    self.tableView.dataSource = self;
    
    [self.view addSubview:self.tableView];

}

#pragma mark - tabelView delegate & dataSource

-(NSInteger)numberOfSectionsInTableView:(UITableView *)tableView{
    
    return 1;
}

-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
    
    return _controllerArr.count;
}

-(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
    
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"cellID"];
    
    if (!cell) {
        
        cell = [[UITableViewCell alloc]initWithStyle:UITableViewCellStyleDefault reuseIdentifier:@"cellID"];
    }
    
    cell.selectionStyle = UITableViewCellSelectionStyleNone;
    
    NSString *decText = [NSString stringWithFormat:@"[%ld]  %@",indexPath.row+1,[_controllerArr[indexPath.row] objectForKey:@"dec"]];
    
    cell.textLabel.text = decText;
    
    return cell;
}

//-(CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath{
//    
//    
//}

//-(CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section{
//    
//}

-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath{
    
    NSString *className = [_controllerArr[indexPath.row]objectForKey:@"className"];
    
    Class controllerClass = NSClassFromString(className);
    
    id nextVC = [[controllerClass alloc]init];
    
    [self.navigationController pushViewController:nextVC animated:YES];
}

@end
